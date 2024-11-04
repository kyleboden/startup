import React, { useState } from 'react';
import './generator.css';

export function Generator() {
  const [loading, setLoading] = useState(false);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);

  const downloadPDF = () => {
    if (localStorage.getItem('resume')) {
      const opt = {
        margin: 0.5,
        filename: 'ApplySmart-Resume.pdf',
        html2canvas: { scale: 4, logging: false },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all' }
      };
      html2pdf().set(opt).from(localStorage.getItem('resume')).save();
    }
  };

  const generateResume = () => {
    setLoading(true);

    const userInfo = localStorage.getItem('user-info')
      ? JSON.parse(localStorage.getItem('user-info'))
      : {
          contactInfo: {},
          education: [],
          workHistory: [],
          skills: '',
          languages: [],
          awardsAndCertifications: [],
          relevantWebsites: [],
          projects: [],
          otherInfo: ''
        };

    const jobData = {
      jobDescription: document.getElementById('job-description').value,
      extraInfo: document.getElementById('extra-info').value
    };

    queryEngine(jobData, userInfo)
      .then(result => {
        const modifiedResult = result.slice(7, -3);
        localStorage.setItem('resume', modifiedResult);

        const opt = {
          margin: 0.5,
          filename: 'ApplySmart-Resume.pdf',
          html2canvas: { scale: 4, logging: false },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak: { mode: 'avoid-all' }
        };

        html2pdf()
          .set(opt)
          .from(modifiedResult)
          .toPdf()
          .get('pdf')
          .then(pdf => {
            const pdfBlob = pdf.output('blob');
            const blobUrl = URL.createObjectURL(pdfBlob);
            setResumePreviewUrl(blobUrl);
          })
          .catch(error => {
            console.error('Error generating PDF:', error);
          });
      })
      .catch(error => {
        console.error('Error generating resume:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main>
      <div className="form-group">
        <label htmlFor="job-description">Job Description:</label>
        <textarea
          id="job-description"
          name="job-description"
          rows="10"
          placeholder="Paste your job description here"
        />
      </div>
      <div className="form-group">
        <label htmlFor="extra-info">Any Extra Information:</label>
        <textarea
          id="extra-info"
          name="extra-info"
          rows="5"
          placeholder="Add any extra information that could be useful for this specific job, e.g., personal experiences, etc."
        />
      </div>
      <button id="generate-resume" onClick={generateResume} disabled={loading}>
        {loading ? (
          <div id="loading-spinner" className="spinner"></div>
        ) : (
          <div id="generate-button-text">Generate and Preview Resume</div>
        )}
      </button>
      {resumePreviewUrl && (
        <>
          <button id="download-pdf-button" onClick={downloadPDF}>
            Download PDF
          </button>
          <div id="resume-preview">
            <iframe id="isolated-frame" src={resumePreviewUrl} title="Resume Preview" />
          </div>
        </>
      )}
    </main>
  );
}

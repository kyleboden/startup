import React from 'react';
import './generator.css';

export function Generator() {
  return (
    <main>
        <div class="form-group">
            <label for="job-description">Job Description:</label>
            <textarea id="job-description" name="job-description" rows="10"
                placeholder="Paste your job description here"></textarea>
        </div>
        <div class="form-group">
            <label for="extra-info">Any Extra Information:</label>
            <textarea id="extra-info" name="extra-info" rows="5"
                placeholder="Add any extra information that could be useful for this specific job, e.g., personal experiences, etc."></textarea>
        </div>
        <button id="generate-resume" onclick="generateResume()">
            Loading spinner element
            <div id="loading-spinner"></div>
            <div id="generate-button-text">Generate and Preview Resume</div>
        </button>
        <button id="download-pdf-button" onclick="downloadPDF()">
            Download PDF
        </button>
        <div id="resume-preview">
            <iframe id="isolated-frame"></iframe>
        </div>
    </main>
  );
}
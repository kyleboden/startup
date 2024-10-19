const userInfo = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : {
  contactInfo: {},
  education: [],
  workHistory: [],
  skills: '',
  languages: [],
  awardsAndCertifications: [],
  relevantWebsites: [],
  projects: [],
  otherInfo: ''
}

function saveSectionInformation(containerId, paramName) {
  const container = document.getElementById(containerId)
  const entries = container.querySelectorAll('div')
  userInfo[paramName] = []
  entries.forEach(entry => {
    const inputs = entry.querySelectorAll('input')
    const savedEntry = {}
    inputs.forEach(input => {
      savedEntry[input.className] = input.value
    })
    userInfo[paramName].push(savedEntry)
  })
}

document.getElementById('save-information').addEventListener('click', () => {
  const contactForm = document.getElementById('contact-entry')
  const contactInputs = contactForm.querySelectorAll('input')
  contactInputs.forEach(input => {
    userInfo.contactInfo[input.className] = input.value
  })

  saveSectionInformation('education-container', 'education')
  saveSectionInformation('work-container', 'workHistory')

  const skillContainer = document.getElementById('skill-container')
  const skills = skillContainer.querySelector('textarea')
  userInfo.skills = skills.value

  saveSectionInformation('language-container', 'languages')
  saveSectionInformation('award-container', 'awardsAndCertifications')
  saveSectionInformation('website-container', 'relevantWebsites')
  saveSectionInformation('project-container', 'projects')

  const otherContainer = document.getElementById('other-container')
  const other = otherContainer.querySelector('textarea')
  userInfo.otherInfo = other.value

  localStorage.setItem('user-info', JSON.stringify(userInfo))
})
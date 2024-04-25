function skillsMember() {
  const member = document.querySelector('.member');
  const memberSkills = document.querySelector('.member-skills');
  const memberSkillsList = document.querySelector('.member-skills-list');
  const memberSkillsClose = document.querySelector('.member-skills-close');

  member.addEventListener('click', () => {
    memberSkills.classList.add('active');
  });

  memberSkillsClose.addEventListener('click', () => {
    memberSkills.classList.remove('active');
  });

  memberSkillsList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      memberSkillsList.querySelectorAll('li').forEach((li) => {
        li.classList.remove('active');
      });
      e.target.classList.add('active');
    }
  });
}
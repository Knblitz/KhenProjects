document.getElementById('toggle-skills-btn').addEventListener('click', function () {
    const hiddenSkills = document.querySelectorAll('.hidden-skill');
    const isHidden = hiddenSkills[0].style.display === 'none' || hiddenSkills[0].style.display === '';
    
    hiddenSkills.forEach(skill => {
      skill.style.display = isHidden ? 'list-item' : 'none';
    });
  
    this.innerHTML = isHidden ? 'View Less <' : 'View More >';
  });
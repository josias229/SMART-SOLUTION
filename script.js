let goals = [];

function renderGoals() {
  const goalList = document.getElementById('goal-list');
  goalList.innerHTML = '';

  goals.forEach((goal, index) => {
    const listItem = document.createElement('li');
    listItem.className = `list-group-item d-flex justify-content-between align-items-center ${goal.priority === 'priority' ? 'priority' : ''}`;
    listItem.innerHTML = `
      ${index + 1}. Je prévois de ${goal.specific}, en mesurant le succès par ${goal.measurable}, afin de ${goal.realistic}, avec une échéance fixée à ${goal.timely}.
      <span class="goal-actions">
        <i class="fas fa-edit" onclick="editGoal(${index})"></i>
        <i class="fas fa-trash-alt" onclick="deleteGoal(${index})"></i>
      </span>
    `;
    goalList.appendChild(listItem);
  });
}

document.getElementById('add-goal').addEventListener('click', () => {
  const specific = document.getElementById('specific').value;
  const measurable = document.getElementById('measurable').value;
  const achievable = document.getElementById('achievable').value;
  const realistic = document.getElementById('realistic').value;
  const timely = document.getElementById('timely').value;
  const priority = document.getElementById('priority').value;

  if (specific && measurable && achievable && realistic && timely) {
    goals.push({ specific, measurable, achievable, realistic, timely, priority });
    renderGoals();
    document.getElementById('smart-form').reset();
  } else {
    alert('Veuillez remplir tous les champs.');
  }
});

function deleteGoal(index) {
  goals.splice(index, 1);
  renderGoals();
}

function editGoal(index) {
  const goal = goals[index];
  document.getElementById('specific').value = goal.specific;
  document.getElementById('measurable').value = goal.measurable;
  document.getElementById('achievable').value = goal.achievable;
  document.getElementById('realistic').value = goal.realistic;
  document.getElementById('timely').value = goal.timely;
  document.getElementById('priority').value = goal.priority;

  deleteGoal(index); // Supprime temporairement pour permettre la modification
}

document.getElementById('download-summary').addEventListener('click', () => {
  if (goals.length === 0) {
    alert("Aucun objectif à télécharger.");
    return;
  }

  // Création du contenu du fichier texte
  let content = "Récapitulatif des Objectifs SMART:\n\n";
  goals.forEach((goal, index) => {
    content += `Objectif ${index + 1} : Je prévois de ${goal.specific}, en mesurant le succès par ${goal.measurable}, afin de ${goal.realistic}, avec une échéance fixée à ${goal.timely}.\n`;
    content += `Priorité : ${goal.priority === 'priority' ? 'Prioritaire' : 'Normal'}\n\n`;
  });

  // Création d'un blob avec le contenu
  const blob = new Blob([content], { type: 'text/plain' });

  // Création d'un lien pour télécharger le fichier
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'objectifs_smart.txt'; // Nom du fichier à télécharger
  link.click(); // Simuler le clic pour démarrer le téléchargement
});

document.addEventListener("DOMContentLoaded", () => {

  document.querySelector("#showScoreboardAggregate").addEventListener("change", (e) => {
    e.target.checked
      ? showScoreboardAggregate("score1")
      : hideScoreboardAggregate("score1");
  });

  var scoreboard1inteval;
  document.querySelector('#switch').addEventListener('change', e => {
    if (e.target.checked) {
      scoreboard1inteval = startScoreboardTime('score1');
    }
    else {
      clearInterval(scoreboard1inteval);
    }
  });

  configureSwitchButtons();
});

class ScoreboardTeam {
  constructor(name = "", color = "", logoSource = "") {
    this.name = name;
    this.color = color;
    this.logoSource = logoSource;
  }
}

const teams = [
  new ScoreboardTeam("Corinthians", "fff", "images/corinthians-logo.png"),
  new ScoreboardTeam("Vasco", "000", "images/vasco-logo.png"),
  new ScoreboardTeam("Gremio", "77e", "images/gremio-logo.png"),
];

const getScoreboardById = (id) => {
  const scoreboard = document.querySelector(`#${id}`);
  if (!scoreboard) throw `Scoreboard #${id} not found`;

  return scoreboard;
};

const setScoreboardTeam = (
  scoreboardId = "",
  team = new ScoreboardTeam("", "", null),
  isHomeTeam = true
) => {
  const scoreboard = getScoreboardById(scoreboardId);
  const teamClass = isHomeTeam ? "home-team" : "away-team";
  scoreboard.querySelector(`.${teamClass} .team-name`).textContent = team.name
    .substring(0, 3)
    .toUpperCase();
  scoreboard.querySelector(
    `.${teamClass} .team-color`
  ).style.background = `#${team.color}`;
  scoreboard.querySelector(`.${teamClass} .logo`).src =
    team.logoSource ?? "images/generic-logo.png";
};

const updateScoreboardGoals = (
  scoreboardId = "",
  homeTeamGoals = 0,
  awayTeamGoals = 0
) => {
  if (isNaN(homeTeamGoals) || isNaN(awayTeamGoals))
    throw "Number of goals must be a number";
  if (homeTeamGoals < 0 || awayTeamGoals < 0)
    throw "Number of goals can not be negative";
  const scoreboard = getScoreboardById(scoreboardId);
  scoreboard.querySelector(".home-team .goals").textContent = homeTeamGoals;
  scoreboard.querySelector(".away-team .goals").textContent = awayTeamGoals;
};

const setScoreboardTime = (scoreboardId, seconds) => {
  getScoreboardById(scoreboardId).dataset.currentTimeInSeconds = seconds;
};

const updateScoreboardTimeDisplay = (scoreboardId) => {
  const scoreboard = getScoreboardById(scoreboardId);
  scoreboard.querySelector(".current-time").textContent =
    getTimeDisplayBySeconds(parseInt(scoreboard.dataset.currentTimeInSeconds));
};

const getTimeDisplayBySeconds = (seconds) => {
  const min = Math.trunc(seconds / 60);
  const sec = seconds % 60;
  const display = `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;

  return display;
};

const startScoreboardTime = (scoreboardId) => {
  updateScoreboardTimeDisplay(scoreboardId);
  const scoreboard = getScoreboardById(scoreboardId);
  const startTime = new Date();
  const initialSeconds = parseInt(scoreboard.dataset.currentTimeInSeconds);
  return setInterval(() => {
    const timeDiffInSeconds = Math.trunc((new Date() - startTime) / 1000);
    scoreboard.dataset.currentTimeInSeconds =
      initialSeconds + timeDiffInSeconds;
    updateScoreboardTimeDisplay(scoreboardId);
  }, 1000);
};

const setScoreboardAddedTime = (scoreboardId, minutes) => {
  getScoreboardById(scoreboardId).querySelector(
    ".added-time"
  ).textContent = `+${minutes}`;
};

const showScoreboardAggregate = (scoreboardId) => {
  const scoreboard = getScoreboardById(scoreboardId);
  scoreboard.classList.remove("hide-aggregate");
  scoreboard.classList.add("show-aggregate");
  if (scoreboard.classList.contains('scoreboard')) {
    scoreboard.querySelectorAll('.red-cards-container').forEach(container => {
      container.classList.add('slide-out');
      container.classList.remove('slide-in');
    });
  }
};

const hideScoreboardAggregate = (scoreboardId) => {
  const scoreboard = getScoreboardById(scoreboardId);
  scoreboard.classList.remove("show-aggregate");
  scoreboard.classList.add("hide-aggregate");
  if (scoreboard.classList.contains('scoreboard')) {
    scoreboard.querySelectorAll('.red-cards-container').forEach(container => {
      container.classList.add('slide-in');
      container.classList.remove('slide-out');
    });
  }
};

const configureSwitchButtons = () => {
  document.querySelectorAll(".switch-btn").forEach((btn) => {
    btn.querySelector(".slider").addEventListener("click", (e) => {
      btn.querySelector('input[type="checkbox"]').click();
    });
  });
};

const setScoreboardTeamsByMatch = (scoreboardId, homeTeamIndex, awayTeamIndex) => {
  setScoreboardTeam(scoreboardId, teams[homeTeamIndex]);
  setScoreboardTeam(scoreboardId, teams[awayTeamIndex], false);
}

const addScoreboardRedCard = (scoreboardId, isHomeTeam = true) => {

  getScoreboardById(scoreboardId).querySelector(`.${isHomeTeam ? 'home' : 'away'}-team .red-cards-container`).append((() => {
    const redCard = document.createElement('div');
    redCard.classList.add('red-card');
    return redCard;
  })());
}

const removeScoreboardRedCard = (scoreboardId, isHomeTeam = true) => {
  [...getScoreboardById(scoreboardId)
    .querySelectorAll(`.${isHomeTeam ? 'home' : 'away'}-team .red-cards-container .red-card`)]
    .find((card, index, cards) => index === cards.length - 1)?.remove();
}
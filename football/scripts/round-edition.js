class SelectableTeam {

    constructor(id, name, logoSource) {
        this.id = id;
        this.name = name;
        this.logoSource = logoSource;
    }
}

const selectableTeams = [
    new SelectableTeam(crypto.randomUUID(), 'Corinthians', 'images/corinthians-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Vasco', 'images/vasco-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'São Paulo', 'images/sao-paulo-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Criciúma', 'images/criciuma-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Grêmio', 'images/gremio-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Flamengo', 'images/flamengo-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Vitória', 'images/vitoria-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Bahia', 'images/bahia-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Cuiabá', 'images/cuiaba-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Botafogo', 'images/botafogo-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Fortaleza', 'images/fortaleza-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Internacional', 'images/internacional-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Athletico-PR', 'images/athletico-pr-logo-2.png'),
    new SelectableTeam(crypto.randomUUID(), 'Atlético-MG', 'images/atletico-mg-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Atlético-GO', 'images/atletico-go-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Cruzeiro', 'images/cruzeiro-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Juventude', 'images/juventude-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Palmeiras', 'images/palmeiras-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Bragantino', 'images/bragantino-logo.png'),
    new SelectableTeam(crypto.randomUUID(), 'Fluminense', 'images/fluminense-logo.png'),
];

document.addEventListener("DOMContentLoaded", () => {
    insertSelectableTeams('timesBrasileirao', selectableTeams);
});

const insertSelectableTeams = (containerId, teams = []) => {

    const container = document.getElementById(containerId);
    const teamsFragment = document.createDocumentFragment();
    teams.forEach((team, index) => {
        teamsFragment.append(createTeamContainer(team));
    });
    container.append(teamsFragment);
}

const createTeamContainer = (team) => {

    if (!(team instanceof SelectableTeam)) throw 'invalid type';
    const teamContainer = document.createElement('div');
    teamContainer.classList.add('team-container');
    teamContainer.dataset.teamId = team.id;

    const logo = document.createElement('img');
    logo.classList.add('team-logo');
    logo.src = team.logoSource;

    const name = document.createElement('span');
    name.classList.add('team-name');
    name.textContent = team.name;

    teamContainer.append(logo, name);

    return teamContainer;
}
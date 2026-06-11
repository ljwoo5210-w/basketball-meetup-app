const loginPage = document.getElementById("loginPage");
const mainPage = document.getElementById("mainPage");
const userName = document.getElementById("userName");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginMessage = document.getElementById("loginMessage");
const createMessage = document.getElementById("createMessage");

const meetupList = document.getElementById("meetupList");

let currentUser = JSON.parse(localStorage.getItem("basketballCurrentUser")) || null;
let meetups = JSON.parse(localStorage.getItem("basketballMeetups")) || [];
let joinedMeetups = JSON.parse(localStorage.getItem("basketballJoinedMeetups")) || [];

function saveData() {
  localStorage.setItem("basketballMeetups", JSON.stringify meetups);
  localStorage.setItem("basketballJoinedMeetups", JSON.stringify(joinedMeetups));
}

function showMainPage() {
  loginPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
  userName.textContent = currentUser.name;
  renderMeetups();
}

function showLoginPage() {
  loginPage.classList.remove("hidden");
  mainPage.classList.add("hidden");
}

if (currentUser) {
  showMainPage();
} else {
  showLoginPage();
}

loginBtn.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const id = document.getElementById("idInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!name || !id || !password) {
    loginMessage.textContent = "이름, 아이디, 비밀번호를 모두 입력해주세요.";
    return;
  }

  currentUser = { name, id };
  localStorage.setItem("basketballCurrentUser", JSON.stringify(currentUser));
  loginMessage.textContent = "";
  showMainPage();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("basketballCurrentUser");
  currentUser = null;
  showLoginPage();
});

document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.add("hidden"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.remove("hidden");

    if (button.dataset.tab === "joinTab") {
      renderMeetups();
    }
  });
});

document.getElementById("createMeetupBtn").addEventListener("click", () => {
  const title = document.getElementById("titleInput").value.trim();
  const place = document.getElementById("placeInput").value.trim();
  const date = document.getElementById("dateInput").value;
  const startTime = document.getElementById("startTimeInput").value;
  const endTime = document.getElementById("endTimeInput").value;
  const capacity = Number(document.getElementById("capacityInput").value);
  const mode = document.getElementById("modeInput").value;
  const level = document.getElementById("levelInput").value;
  const description = document.getElementById("descriptionInput").value.trim();

  if (!title || !place || !date || !startTime || !endTime || !capacity || !mode || !level) {
    createMessage.textContent = "필수 정보를 모두 입력해주세요.";
    createMessage.classList.remove("success");
    return;
  }

  if (startTime >= endTime) {
    createMessage.textContent = "종료 시간은 시작 시간보다 늦어야 합니다.";
    createMessage.classList.remove("success");
    return;
  }

  if (capacity < 1) {
    createMessage.textContent = "모집 인원은 1명 이상이어야 합니다.";
    createMessage.classList.remove("success");
    return;
  }

  const newMeetup = {
    id: Date.now(),
    title,
    place,
    date,
    startTime,
    endTime,
    capacity,
    mode,
    level,
    description,
    currentCount: 1,
    creatorId: currentUser.id,
    creatorName: currentUser.name
  };

  meetups.push(newMeetup);
  joinedMeetups.push(newMeetup.id);
  localStorage.setItem("basketballMeetups", JSON.stringify(meetups));
  localStorage.setItem("basketballJoinedMeetups", JSON.stringify(joinedMeetups));

  clearCreateForm();

  createMessage.textContent = "모임이 성공적으로 등록되었습니다.";
  createMessage.classList.add("success");

  renderMeetups();
});

function clearCreateForm() {
  document.getElementById("titleInput").value = "";
  document.getElementById("placeInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("startTimeInput").value = "";
  document.getElementById("endTimeInput").value = "";
  document.getElementById("capacityInput").value = "";
  document.getElementById("modeInput").value = "";
  document.getElementById("levelInput").value = "";
  document.getElementById("descriptionInput").value = "";
}

document.getElementById("searchPlaceInput").addEventListener("input", renderMeetups);
document.getElementById("filterDateInput").addEventListener("change", renderMeetups);
document.getElementById("filterModeInput").addEventListener("change", renderMeetups);
document.getElementById("filterLevelInput").addEventListener("change", renderMeetups);
document.getElementById("openOnlyInput").addEventListener("change", renderMeetups);

function renderMeetups() {
  const searchPlace = document.getElementById("searchPlaceInput")?.value.trim().toLowerCase() || "";
  const filterDate = document.getElementById("filterDateInput")?.value || "";
  const filterMode = document.getElementById("filterModeInput")?.value || "";
  const filterLevel = document.getElementById("filterLevelInput")?.value || "";
  const openOnly = document.getElementById("openOnlyInput")?.checked || false;

  let filteredMeetups = meetups.filter((meetup) => {
    const isOpen = meetup.currentCount < meetup.capacity;

    return (
      meetup.place.toLowerCase().includes(searchPlace) &&
      (!filterDate || meetup.date === filterDate) &&
      (!filterMode || meetup.mode === filterMode) &&
      (!filterLevel || meetup.level === filterLevel) &&
      (!openOnly || isOpen)
    );
  });

  if (filteredMeetups.length === 0) {
    meetupList.innerHTML = `<div class="empty">등록된 모임이 없습니다.</div>`;
    return;
  }

  meetupList.innerHTML = filteredMeetups
    .map((meetup) => {
      const isClosed = meetup.currentCount >= meetup.capacity;
      const alreadyJoined = joinedMeetups.includes(meetup.id);

      return `
        <div class="meetup-card">
          <h3>${meetup.title}</h3>

          <div class="badges">
            <span class="badge">${meetup.mode}</span>
            <span class="badge">${meetup.level}</span>
            <span class="badge ${isClosed ? "closed" : "open"}">
              ${isClosed ? "모집 마감" : "모집 중"}
            </span>
          </div>

          <div class="detail">
            <p><strong>장소:</strong> ${meetup.place}</p>
            <p><strong>날짜:</strong> ${meetup.date}</p>
            <p><strong>시간:</strong> ${meetup.startTime} ~ ${meetup.endTime}</p>
            <p><strong>인원:</strong> ${meetup.currentCount} / ${meetup.capacity}</p>
            <p><strong>개설자:</strong> ${meetup.creatorName}</p>
            <p><strong>설명:</strong> ${meetup.description || "설명이 없습니다."}</p>
          </div>

          <button 
            onclick="joinMeetup(${meetup.id})"
            ${isClosed || alreadyJoined ? "disabled" : ""}
          >
            ${alreadyJoined ? "참가 완료" : isClosed ? "모집 마감" : "참가하기"}
          </button>
        </div>
      `;
    })
    .join("");
}

function joinMeetup(meetupId) {
  const meetup = meetups.find((item) => item.id === meetupId);

  if (!meetup) {
    alert("모임을 찾을 수 없습니다.");
    return;
  }

  if (joinedMeetups.includes(meetupId)) {
    alert("이미 참가한 모임입니다.");
    return;
  }

  if (meetup.currentCount >= meetup.capacity) {
    alert("이미 모집이 마감된 모임입니다.");
    return;
  }

  meetup.currentCount += 1;
  joinedMeetups.push(meetupId);

  localStorage.setItem("basketballMeetups", JSON.stringify(meetups));
  localStorage.setItem("basketballJoinedMeetups", JSON.stringify(joinedMeetups));

  alert("참가가 완료되었습니다.");
  renderMeetups();
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, "Noto Sans KR", sans-serif;
  background: #f3f5f8;
  color: #222;
}

.app {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}

.hidden {
  display: none !important;
}

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card,
.card {
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.09);
}

.login-card {
  width: 100%;
  max-width: 430px;
}

h1,
h2,
h3 {
  margin-top: 0;
}

.subtitle,
.card-desc {
  color: #555;
  line-height: 1.6;
}

label {
  display: block;
  margin-top: 14px;
  margin-bottom: 7px;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px 13px;
  border: 1px solid #cfd6df;
  border-radius: 11px;
  font-size: 15px;
  background: white;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #ff7a00;
  box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.15);
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  border: none;
  background: #ff7a00;
  color: white;
  padding: 12px 18px;
  border-radius: 11px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 16px;
}

button:hover {
  opacity: 0.92;
}

button:disabled {
  background: #b8bec7;
  cursor: not-allowed;
  opacity: 1;
}

.outline-btn {
  background: white;
  color: #ff7a00;
  border: 1px solid #ff7a00;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1f2937;
  color: white;
  padding: 26px;
  border-radius: 20px;
  margin-bottom: 20px;
}

.header p {
  margin-bottom: 0;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}

.tab-btn {
  background: #e5e7eb;
  color: #222;
}

.tab-btn.active {
  background: #ff7a00;
  color: white;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.filters {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr;
  gap: 12px;
  align-items: center;
  margin: 20px 0 12px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin-top: 0;
}

.checkbox input {
  width: auto;
}

.toolbar {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 18px;
}

.small-btn {
  padding: 9px 13px;
  font-size: 13px;
  background: #495057;
  margin-top: 0;
}

.danger-btn {
  background: #e03131;
}

.message {
  margin-top: 12px;
  font-weight: 700;
  color: #e03131;
}

.success {
  color: #2b8a3e;
}

.meetup-list {
  display: grid;
  gap: 16px;
}

.meetup-card {
  border: 1px solid #e3e7ee;
  border-radius: 18px;
  padding: 22px;
  background: #fbfcfe;
}

.meetup-card h3 {
  margin-bottom: 8px;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 16px;
}

.badge {
  background: #edf2ff;
  color: #364fc7;
  padding: 6px 11px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.closed {
  background: #ffe3e3;
  color: #c92a2a;
}

.open {
  background: #d3f9d8;
  color: #2b8a3e;
}

.detail {
  color: #444;
  line-height: 1.6;
}

.detail p {
  margin: 6px 0;
}

.empty {
  text-align: center;
  color: #777;
  background: #f8f9fa;
  border: 1px dashed #cfd6df;
  border-radius: 16px;
  padding: 34px;
}

.joined-text {
  color: #2b8a3e;
  font-weight: 700;
  margin-left: 8px;
}

@media (max-width: 850px) {
  .form-grid,
  .filters {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .tabs {
    flex-direction: column;
  }

  .toolbar {
    flex-direction: column;
  }
}

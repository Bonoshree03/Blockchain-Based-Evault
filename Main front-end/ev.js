import React, { useState } from 'react';
import Web3 from 'web3';

document.getElementById("menu-toggle").addEventListener("click", () => {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("show");
});

document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-bar").value.trim();
  if (query) {
    // Add your database search functionality here
    console.log("Searching for:", query);
  } else {
    alert("Please enter a search query.");
  }
});
// script.js
const menuToggle = document.getElementById("menu-toggle");
const closeMenu = document.getElementById("close-menu");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.add("show");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("show");
});

document.getElementById('file-upload-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Files uploaded successfully!');
});
document.getElementById('upload-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('file-input');
  const fileList = document.getElementById('file-list');

  if (fileInput.files.length === 0) {
    alert("No files selected!");
    return;
  }

  Array.from(fileInput.files).forEach(file => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="file-name">${file.name}</span>
      <div class="dropdown">
        <button class="dropdown-button">⋮</button>
        <div class="dropdown-menu">
          <a href="#">Select</a>
          <a href="#">Share</a>
          <a href="#">Delete</a>
          <a href="#">Update/Reupload</a>
        </div>
      </div>
    `;
    fileList.appendChild(listItem);
  });

  fileInput.value = ''; // Clear file input
});

document.getElementById('upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const category = document.getElementById('file-category').value;
  const fileInput = document.getElementById('file-upload');
  const fileName = fileInput.files[0]?.name;

  if (!fileName) {
    alert('Please select a file to upload.');
    return;
  }

  const fileList = document.getElementById('file-list');
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${category}: ${fileName}</span>
    <div class="file-actions">
      <button>⋮</button>
      <div class="dropdown">
        <a href="#">Select</a>
        <a href="#">Share</a>
        <a href="#">Delete</a>
        <a href="#">Update/Reupload</a>
      </div>
    </div>
  `;
  fileList.appendChild(li);
  fileInput.value = ''; // Clear the file input
});

document.getElementById('healthcare-upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const category = document.getElementById('healthcare-category').value;
  const fileInput = document.getElementById('healthcare-file-upload');
  const fileName = fileInput.files[0]?.name;

  if (!fileName) {
    alert('Please select a file to upload.');
    return;
  }

  const recordList = document.getElementById('healthcare-record-list');
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${category}: ${fileName}</span>
    <div class="record-actions">
      <button>⋮</button>
      <div class="dropdown">
        <a href="#">Update</a>
        <a href="#">Delete</a>
        <a href="#">Share</a>
      </div>
    </div>
  `;
  recordList.appendChild(li);
  fileInput.value = ''; // Clear the file input
});






// Mock data for files
const files = [
  { id: 1, name: "Document 1", category: "Central Govt" },
  { id: 2, name: "Document 2", category: "State Govt" },
  { id: 3, name: "Document 3", category: "Visa" },
];

/// Mock data for files
const files = [
  { id: 1, name: "Document 1", category: "Central Govt", url: "#" },
  { id: 2, name: "Document 2", category: "State Govt", url: "#" },
  { id: 3, name: "Document 3", category: "Visa", url: "#" },
];

// State for selected files
let selectedFiles = new Set();

// Function to render files dynamically
function renderFiles(fileList) {
  const fileListElement = document.getElementById("file-list");
  fileListElement.innerHTML = ""; // Clear any existing content

  fileList.forEach((file) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="file-checkbox" onchange="toggleFileSelection(${file.id})">
      <span>${file.name} - (${file.category})</span>
      <div class="file-actions">
        <button onclick="shareFile('${file.url}')">Share</button>
        <button onclick="saveFile('${file.name}')">Save</button>
        <button onclick="downloadFile('${file.url}')">Download</button>
        <button onclick="deleteFile(${file.id})">Delete</button>
      </div>
    `;
    fileListElement.appendChild(li);
  });
}

// Function to filter files based on search input
function filterFiles() {
  const searchValue = document.getElementById("search-bar").value.toLowerCase();
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchValue)
  );
  renderFiles(filteredFiles);
}

// Manage selected files
function toggleFileSelection(fileId) {
  if (selectedFiles.has(fileId)) {
    selectedFiles.delete(fileId);
  } else {
    selectedFiles.add(fileId);
  }
}

// Bulk actions
function bulkShare() {
  const selected = Array.from(selectedFiles);
  if (selected.length === 0) return alert("No files selected to share!");
  alert(`Sharing files with IDs: ${selected.join(", ")}`);
}

function bulkDownload() {
  const selected = Array.from(selectedFiles);
  if (selected.length === 0) return alert("No files selected to download!");
  alert(`Downloading files with IDs: ${selected.join(", ")}`);
}

function bulkDelete() {
  const selected = Array.from(selectedFiles);
  if (selected.length === 0) return alert("No files selected to delete!");
  selected.forEach((fileId) => {
    const index = files.findIndex((file) => file.id === fileId);
    if (index !== -1) {
      files.splice(index, 1);
    }
  });
  alert(`Deleted files with IDs: ${selected.join(", ")}`);
  selectedFiles.clear(); // Reset the selection
  renderFiles(files);
}

// Placeholder actions for individual file buttons
function shareFile(url) {
  alert(`Sharing file: ${url}`);
}

function saveFile(name) {
  alert(`Saving file: ${name}`);
}

function downloadFile(url) {
  alert(`Downloading file: ${url}`);
}

function deleteFile(id) {
  const index = files.findIndex((file) => file.id === id);
  if (index !== -1) {
    files.splice(index, 1);
    alert(`File deleted`);
    renderFiles(files);
  }
}

// Event listeners
document.getElementById("search-bar").addEventListener("input", filterFiles);
document.getElementById("search-button").addEventListener("click", filterFiles);

// Initial rendering of files
renderFiles(files);



// Mock data for received files
const receivedFiles = [
  { id: 1, name: "Budget Report", sender: "John Doe", url: "#" },
  { id: 2, name: "Design Mockup", sender: "Jane Smith", url: "#" },
  { id: 3, name: "Project Plan", sender: "Alice Johnson", url: "#" },
];

// State for selected files
let selectedFiles = new Set();

// Function to render received files dynamically
function renderReceivedFiles(fileList) {
  const fileListElement = document.getElementById("file-list");
  fileListElement.innerHTML = ""; // Clear any existing content

  fileList.forEach((file) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="file-checkbox" onchange="toggleFileSelection(${file.id})">
      <span>${file.name} - Sent by: ${file.sender}</span>
      <div class="file-actions">
        <button onclick="shareFile('${file.url}')">Share</button>
        <button onclick="saveFile('${file.name}')">Save</button>
        <button onclick="downloadFile('${file.url}')">Download</button>
        <button onclick="deleteFile(${file.id})">Delete</button>
      </div>
    `;
    fileListElement.appendChild(li);
  });
}

// Function to filter received files based on search input
function filterReceivedFiles() {
  const searchValue = document.getElementById("search-bar").value.toLowerCase();
  const filteredFiles = receivedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchValue)
  );
  renderReceivedFiles(filteredFiles);
}

// Manage selected files
function toggleFileSelection(fileId) {
  if (selectedFiles.has(fileId)) {
    selectedFiles.delete(fileId);
  } else {
    selectedFiles.add(fileId);
  }
}

// Bulk actions
function bulkShare() {
  const selected = Array.from(selectedFiles);
  if (selected.length === 0) return alert("No files selected to share!");
  alert(`Sharing files with IDs: ${selected.join(", ")}`);
}

function bulkDownload() {
  const selected = Array.from(selectedFiles);
  if (selected.length === 0) return alert("No files selected to download!");
  alert(`Downloading files with IDs: ${selected.join(", ")}`);
}

function bulkDelete() {
  const selected = Array.from(selectedFiles);
  if (selected.length === 0) return alert("No files selected to delete!");
  selected.forEach((fileId) => {
    const index = receivedFiles.findIndex((file) => file.id === fileId);
    if (index !== -1) {
      receivedFiles.splice(index, 1);
    }
  });
  alert(`Deleted files with IDs: ${selected.join(", ")}`);
  selectedFiles.clear(); // Reset the selection
  renderReceivedFiles(receivedFiles);
}

// Placeholder actions for individual file buttons
function shareFile(url) {
  alert(`Sharing file: ${url}`);
}

function saveFile(name) {
  alert(`Saving file: ${name}`);
}

function downloadFile(url) {
  alert(`Downloading file: ${url}`);
}

function deleteFile(id) {
  const index = receivedFiles.findIndex((file) => file.id === id);
  if (index !== -1) {
    receivedFiles.splice(index, 1);
    alert(`File deleted`);
    renderReceivedFiles(receivedFiles);
  }
}

// Event listeners
document.getElementById("search-bar").addEventListener("input", filterReceivedFiles);
document.getElementById("search-button").addEventListener("click", filterReceivedFiles);

// Initial rendering of received files
renderReceivedFiles(receivedFiles);



// Handle form submission
document.getElementById("verification-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Retrieve input values
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const otp = document.getElementById("otp").value.trim();

  // Simulated verification logic
  if (username === "testuser" && password === "password123" && otp === "123456") {
    alert("Verification successful! Redirecting to evidence files...");
    window.location.href = "evidencefiles.html"; // Redirect to evidence files page
  } else {
    alert("Verification failed! Please check your credentials and try again.");
  }
});

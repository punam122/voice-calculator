function Total() {
  let Price = parseFloat(document.getElementById('Price').value);
  let GST = parseFloat(document.getElementById('GST').value);
  let total_Price = Price + GST;
  alert(`Total Price: ₹${total_Price.toFixed(2)}`);
}





let btn2 = document.querySelector("#btn2");
let content = document.querySelector("#content");

btn2.addEventListener("click", () => {
    speak("Welcome to the Global Voice Calculator!");
});



// Select elements


// Speech Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-IN';
recognition.continuous = false;
recognition.interimResults = false;

// Speech Synthesis function
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
}

// GST Calculation logic
function handleQuery(text) {
    const amountMatch = text.match(/(?:₹|Rs\.?|rupees)?\s*(\d+(?:,\d{3})*(?:\.\d+)?)/i);
    const gstMatch = text.match(/(\d{1,2})\s*%|percent/i);


    if (amountMatch && gstMatch) {
        const amount = parseFloat(amountMatch[1].replace(/,/g, ""));
        const gstRate = parseFloat(gstMatch[1]);
        const gstAmount = (amount * gstRate) / 100;
        const total = amount + gstAmount;

        const response = `GST on ₹${amount} at ${gstRate}% is ₹${gstAmount.toFixed(2)}. Total amount is ₹${total.toFixed(2)}.`;
        content.textContent = response;
        speak(response);
    } else {
        const errorMsg = "Sorry, I couldn't understand the amount or GST rate.";
        content.textContent = errorMsg;
        speak(errorMsg);
    }
}

// Start recognition on button click
btn2.addEventListener("click", () => {
    recognition.start();
    content.textContent = "Listening...";
});

// Handle recognition result
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    content.textContent = `You said: ${transcript}`;
    handleQuery(transcript);
};

recognition.onerror = (event) => {
    const errorMsg = `Error: ${event.error}`;
    content.textContent = errorMsg;
    speak("There was an error. Please try again.");
};

const hsnData = [
  { name: "laptop", code: "8471", category: "electronics", description: "Portable computer device" },
  { name: "mobile phone", code: "8517", category: "electronics", description: "Handheld communication device" },
  { name: "sofa", code: "9401", category: "furniture", description: "Comfortable seating furniture" },
  { name: "t-shirt", code: "6109", category: "clothing", description: "Cotton upper body garment" }
];

// Populate autocomplete suggestions
const datalist = document.getElementById("suggestions");
hsnData.forEach(item => {
  const option = document.createElement("option");
  option.value = item.name;
  datalist.appendChild(option);
});

document.getElementById("search-btn").addEventListener("click", function() {
  const query = document.getElementById("search-box").value.toLowerCase();
  const category = document.getElementById("category-filter").value;
  const resultsDiv = document.getElementById("results");

  const filtered = hsnData.filter(item => {
    const matchesName = item.name.includes(query);
    const matchesCategory = category ? item.category === category : true;
    return matchesName && matchesCategory;
  });

  if (filtered.length > 0) {
    resultsDiv.innerHTML = filtered.map(item =>
      `<div>
        <strong>Product:</strong> ${item.name}<br>
        <strong>HSN Code:</strong> ${item.code}<br>
        <strong>Description:</strong> ${item.description}<br>
        <strong>Category:</strong> ${item.category}
      </div><hr>`
    ).join("");
  } else {
    resultsDiv.innerHTML = "No matching HSN code found.";
  }
});



function searchHSN() {
  const query = document.getElementById("search-box1").value.toLowerCase();
  const result = hsnData.find(item =>
    item.name.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.code === query
  );

  document.getElementById("results").innerHTML = result
    ? `<strong>Product:</strong> ${result.name}<br>
       <strong>HSN Code:</strong> ${result.code}<br>
       <strong>Description:</strong> ${result.description}`
    : "No matching product or HSN code found.";
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("search-box1").value = transcript;
    searchHSN();
  };
  recognition.start();
}










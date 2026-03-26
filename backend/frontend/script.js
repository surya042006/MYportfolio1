const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation
  if (!name || !phone || !email || !message) {
    alert("Please fill all fields ❗");
    return;
  }

  const data = { name, phone, email, message };

  try {
    const response = await fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      alert("Message Sent Successfully ✅");
      form.reset();
    } else {
      alert("Server Error ❌");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Cannot connect to server ❌");
  }
});
const content = document.getElementById("content");



//*************************get data***************************** */

async function employees() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/employee");

        const data = await response.json();
        console.log(data.status);
        if (data.status == 200) {
            displayData(data);
        } else {
            content.innerHTML = `<p class="create-first-contact-message">You currently dont have any contacts.<br/>Create your first contact!
</p>`;
        }
    } catch (error) {
        console.error("sorry there was an error, please try again", error);
    }
}

employees();



//***********************************display data****************************************** */
function displayData(data) {
    content.innerHTML = "";
    data.employee.forEach((item) => {
        content.innerHTML += `
    <div class="contacts-wrapper" id="${item.id}">
    <div class="details-wrapper">
    <span>Name:</span>
    <p class="contact-info">${item.name}</p>
    </div>
    <div class="details-wrapper">
    <span>Gender:</span>
    <p class="contact-info">${item.gender}</p>
    </div>
    <div class="details-wrapper">
    <span>Email:</span>
    <p class="contact-info">${item.email}</p>
    </div>
    <div class="details-wrapper">
    <span>Phone:</span>
    <p class="contact-info">${item.phone}</p>
    </div>
    <input id="btn-delete" type="submit" value="Delete" />
    <input id="btn-edit" type="submit" value="Edit" />
    </div>
    
    
    `;
    });
}

const form = document.querySelector("#contact-form");
const successModal = document.querySelector(".success-modal");
const successMessage = document.querySelector(".success-message");
const inputField = document.querySelectorAll(".input-field");



//***********************************post data****************************************** */

async function postData() {
    // Associate the FormData object with the form element
    const formData = new FormData(form);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/employee", {
            method: "POST",
            // Set the FormData instance as the request body
            body: formData,
        });
        const data = await response.json();

        if (data.status == 200) {
            employees();
            successModal.style.display = "block";
            successMessage.innerHTML = "New Contact Created";
            inputField.forEach((item) => (item.value = ""));

            setTimeout(hideModal, 3000);
        } else {
            successModal.style.display = "block";
            successMessage.innerHTML = "Sorry, please try again";
            setTimeout(hideModal, 3000);
        }

        function hideModal() {
            successMessage.innerHTML = "";
            successModal.style.display = "none";
        }
    } catch (e) {
        console.error(e);
    }
}

// Take over form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    postData();
});




//***********************************Delete a contact****************************************** */


async function deleteContact(id) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/employee/${id}/delete`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        console.log(data.status);

        if (data.status == 200) {
            employees();
            successModal.style.display = "block";
            successMessage.innerHTML = "Contact was deleted!";

            setTimeout(hideModal, 2000);
        } else {
            successModal.style.display = "block";
            successMessage.innerHTML = "Sorry, please try again!";
            setTimeout(hideModal, 2000);
        }

        function hideModal() {
            successMessage.innerHTML = "";
            successModal.style.display = "none";
        }
    } catch (e) {
        console.error(e);
    }
}

const btnDelete = document.getElementById("btn-delete");

document.addEventListener("click", function (e) {
    if (e.target.id == "btn-delete") {
        const contactId = e.target.parentElement.id;
        console.log(contactId);
        deleteContact(contactId);
    }
});


//***********************************Edit a contact****************************************** */

const btnEdit = document.getElementById("btn-edit");

//const contactId = document.getElementById("contact-id");
const formName = document.getElementById("name");
const formGender = document.getElementById("gender");
const formEmail = document.getElementById("email");
const formPhone = document.getElementById("phone");

let contactId;

const editModalWrapper = document.querySelector(".edit-modal-wrapper");

const editModal = document.querySelector(".edit-modal");

document.addEventListener("click", function (e) {
    const contactFields =
        e.target.parentElement.querySelectorAll(".contact-info");

    if (e.target.id == "btn-edit") {
        contactId = e.target.parentElement.id;
        formName.value = contactFields[0].textContent;
        formGender.value = contactFields[1].textContent;
        formEmail.value = contactFields[2].textContent;
        formPhone.value = contactFields[3].textContent;

        contactId = e.target.parentElement.id;

        editModalWrapper.style.display = "block";
    }
});

const formEdit = document.querySelector("#contact-form-edit");
const success = document.querySelector(".success");
const closeBtn = document.querySelector(".close");

async function updateContact(id) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/employee/${id}/edit`,
            {
                method: "PUT",

               
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name: `${formName.value}`,
                    gender: `${formGender.value}`,
                    email: `${formEmail.value}`,
                    phone: `${formPhone.value}`,
                }),
            }
        );

        const data = await response.json();

        if (data.status == 200) {
            success.innerHTML = "Updating contact......";
            employees();

            setTimeout(hideModal, 2000);

            function hideModal() {
                editModalWrapper.style.display = "none";
                successModal.style.display = "block";
                successMessage.innerHTML = "Contact was updated!";
                success.innerHTML = "";

                setTimeout(hideMessage, 1000);
            }
        } else {
            success.innerHTML = "Sorry please try again!";
        }

        function hideMessage() {
            successModal.style.display = "none";
            successMessage.innerHTML = "";
        }
    } catch (e) {
        console.error(e);
    }
}

// Take over form submission
formEdit.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = validateEditForm();

    if (isValid == 0) {
        updateContact(contactId);
    }
});


//*************** Hide modal********************* */

closeBtn.addEventListener("click", (event) => {
    editModalWrapper.style.display = "none";
});







//****************************** validate edit form ***************************** */




function validateEditForm() {
    // Regular expression
    const regex = /\d/;

    // Check if string contians numbers

    const nameValidate = regex.test(formName.value);
    const genderValidate = regex.test(formGender.value);

    if (nameValidate) {
        formName.style.border = "1px solid red";
        formName.value = "";
        formName.placeholder = "Name cant contain numbers!";
    } else {
        formName.style.border = "1px solid black";
    }

    if (genderValidate) {
        formGender.style.border = "1px solid red";
        formGender.value = "";
        formGender.placeholder = "Cant contain numbers!";
    } else {
        formGender.style.border = "1px solid black";
    }

    console.log("name", !nameValidate);
    console.log("gender", !genderValidate);

    return nameValidate + genderValidate;
}

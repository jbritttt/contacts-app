<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">



<link href="{{ asset('/index.css') }}" rel="stylesheet">


<script type="text/javascript" src="{{asset('/index.js') }}" defer></script>

    <title>Document</title>
</head>

<body>
    
<h1>Contacts</h1>

<main>  
    
<div id="content">


</div>


<form id="contact-form">
    <h2>Create a new contact </h2>
    
<div> 
    <label for="">Name</label>
<input class="input-field" type="name" name="name" placeholder="Enter name" required>

</div>

<div> 
    <label for="">Gender</label>
<input class="input-field" type="text" name="gender" placeholder="Enter gender" required>

</div>

<div> 
    <label for="">Email</label>
<input class="input-field" type="email" name="email" placeholder="Enter email" required>

</div>

<div> 
    <label for="">Phone</label>
<input class="input-field" type="text" name="phone"  maxlength="10" pattern="\d{10}" placeholder="Enter 10 digit number" required>

</div>
<input id="btn-create" type="submit" value="Submit" />

</form>


</main>

<div class="edit-modal-wrapper">

<div class="edit-modal">
<div class="close"><strong>X</strong></div>
<form id="contact-form-edit">
   
<div> 




    <label for="">Name</label>
<input class="input-field" id="name" type="text" name="name" placeholder="name" required>

</div>

<div> 
    <label for="">Gender</label>
<input class="input-field" id="gender" type="text" name="gender" placeholder="gender" required>

</div>

<div> 
    <label for="">Email</label>
<input class="input-field" id="email" type="email" name="email" placeholder="email" required>

</div>

<div> 
    <label for="">Phone</label>
<input class="input-field" id="phone" type="text" name="phone" placeholder="phone" maxlength="10" pattern="\d{10}" placeholder="Enter 10 digit number" required>

</div>
<input id="btn-update" type="submit" value="Update" />
<p class="success"></p>


</form>




</div>

</div>

<div class="success-modal">
    <p class="success-message"></p>


</div>



</body>
</html>

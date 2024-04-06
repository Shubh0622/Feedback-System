function handleFormSubmit(event) {
    event.preventDefault();
    const feedbackDetails = {
      username: event.target.username.value,
      rating: event.target.rating.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/b14708abbd424ddb92b7e678e8ac2f19/feedbackData",
        feedbackDetails
      )
      .then((response) => {
        displayUserOnScreen(response.data)
        addOverallRating(response.data)
    })
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("sub").value="Submit";
    document.querySelector("form").reset();
    
  }
  window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/b14708abbd424ddb92b7e678e8ac2f19/feedbackData")
    .then(res =>{
      for(let i=0;i<res.data.length;i++){
        displayUserOnScreen(res.data[i]);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  })
  
  function displayUserOnScreen(feedbackDetails) {
    const feedbackItem = document.createElement("li");
    feedbackItem.appendChild(
      document.createTextNode(
        `${feedbackDetails.username} - ${feedbackDetails.rating}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    feedbackItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    feedbackItem.appendChild(editBtn);
  
    const feedbackList = document.getElementById("info");
    feedbackList.appendChild(feedbackItem);
  
    deleteBtn.addEventListener("click", function (event) {
      let id=feedbackDetails._id;
      axios.delete(`https://crudcrud.com/api/b14708abbd424ddb92b7e678e8ac2f19/feedbackData/${id}`)
           .then(res => {
            feedbackList.removeChild(event.target.parentElement)
        })
           .catch(err => console.log(err))
      // userList.removeChild(event.target.parentElement);
      
    });
  
    editBtn.addEventListener("click", function (event) {
      
      
      document.getElementById("username").value = feedbackDetails.username;
      document.getElementById("rating").value = feedbackDetails.rating;
      document.getElementById("sub").value="Edit Rating";
    
      let id=feedbackDetails._id;
      
      axios.delete(`https://crudcrud.com/api/b14708abbd424ddb92b7e678e8ac2f19/feedbackData/${id}`)
           .then(res => {
            feedbackList.removeChild(event.target.parentElement)
            
        })
           .catch(err => console.log(err))
    });
  }

  function addOverallRating(feedbackDetails){
    //feedbackDetails.rating;
    let rating=document.getElementById(`${feedbackDetails.rating}`);
    let ratingCount=rating.getAttribute("data-val");
    ratingCount++;
    
    rating.setAttribute("data-val",ratingCount);
    
  }
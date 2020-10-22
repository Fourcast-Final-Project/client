import firebase from 'firebase'
import React, { useEffect } from 'react'

// Since you mentioned your images are in a folder,
// we'll create a Reference to that folder:
var storageRef = firebase.storage().ref("your_folder");

// Now we get the references of these images
storageRef.listAll().then(function(result) {
    result.items.forEach(function(imageRef) {
    // And finally display them
        displayImage(imageRef);
    });
}).catch(function(error) {
    // Handle any errors
    console.log(error)
});

function displayImage(imageRef) {
    imageRef.getDownloadURL().then(function(url) {
    // TODO: Display the image on the UI
    }).catch(function(error) {
    // Handle any errors
    console.log(error)
    });
}

function Photo () {

    return (
        <>
        </>
    )
}

export default Photo
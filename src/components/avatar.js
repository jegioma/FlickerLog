import { getStorage, ref, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const listAvailableImages = async () => {
  const storageRef = ref(storage, 'images'); // Change 'images' to your actual folder name
  const imageList = await listAll(storageRef);
  const imageURLs = [];

  for (const imageItem of imageList.items) {
    const imageUrl = await getDownloadURL(imageItem.location.path);
    imageURLs.push(imageUrl);
  }

  return imageURLs;
};

const selectAvatar = async () => {
  try {
    const imageURLs = await listAvailableImages();
    // Here, imageURLs contains the available avatar URLs from Firebase Storage
    // You can use these URLs in your UI to allow users to select avatars.
    console.log("Available avatar URLs:", imageURLs);
  } catch (error) {
    console.error("Error fetching avatars:", error);
  }
};

const uploadImage = async (file) => {
  const storageRef = ref(storage, 'images/' + file.name);
  const metadata = {
    contentType: 'image/jpeg' // Update the content type as needed
  };

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      console.error("Error uploading file:", error);
    },
    async () => {
      try {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    }
  );
};

// Example usage of the uploadImage function
// Replace 'file' with the File object you want to upload
// uploadImage(file);

selectAvatar(); // Call selectAvatar function to list available images

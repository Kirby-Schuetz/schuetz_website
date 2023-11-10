import { useState } from "react";
import Modal from "react-modal";
import learnContactTop from "../assets/learnContactTop.png"

const ModalContent = () => (
    <div>
      <h2>Contact Information</h2>
      <p>LinkedIn: <a href="https://www.linkedin.com/kirby-schuetz">linkedin.com/in/kirby-schuetz/</a></p>
      <p>GitHub: <a href="https://github.com/Kirby=Schuetz">github.com/Kirby-Schuetz</a></p>
    </div>
  );

export default function Contact() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
        <h1>contact</h1>
        <img src={learnContactTop} alt="contact flyer" 
        onClick={() => setModalIsOpen(true)}
        style={{ cursor: "pointer"}}
        />

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Contact Modal"
        style={{
            content: {
              width: '50%', // Adjust the width as needed
              height: '50%', // Adjust the height as needed
              margin: 'auto', // Center the modal horizontally
              marginTop: '10%', // Adjust the top margin as needed
              backgroundColor: "#FBFBED",
            },
          }}
        >
            <button onClick={() => setModalIsOpen(false)}>Close</button>
            <ModalContent />
        </Modal>
        </div>
    );
}
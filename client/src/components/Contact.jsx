import React, { useState } from "react";
import Modal from "react-modal";
import learnContactTop from "../assets/learnContactTop.png";
import ModalContent from "./Modal/ModalContent";

Modal.setAppElement('#root');

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
                height: 'auto', // Adjust the height as needed
                margin: 'auto', // Center the modal horizontally
                marginTop: '10%', // Adjust the top margin as needed
                backgroundColor: "#f1efdf",
              },
            }}
        >
          <button onClick={() => setModalIsOpen(false)}>Close</button>
          <ModalContent />
        </Modal>
        </div>
    );
}
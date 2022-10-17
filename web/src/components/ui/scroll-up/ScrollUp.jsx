import "./ScrollUp.css"
import React from "react";

function ScrollUp() {
  let mybutton = document.getElementById("btn-back-to-top");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

//   mybutton.addEventListener("click", backToTop);

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary opacity-50 btn-floating btn-sm mb-5"
        id="btn-back-to-top"
        onClick={() => backToTop()}
      >
        <i className="fa fa-arrow-up"></i>
      </button>
    </div>
  );
}

export default ScrollUp;

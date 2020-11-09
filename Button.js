import React from "react";

function Button({ quizs }) {
  return (
    <div>
      <button>{quizs.name}</button>
    </div>
  );
}

export default Button;

import React from "react";
import GoogleIcon from "../assets/icons/GoogleIcon";

const Register = () => {
  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center bg-[#23242a]">
      <div
        className={`form-container mt-[5vh] w-[380px] h-[580px]`}
      >
        <form>
          <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
            Sign Up
          </h2>
          <div class="relative z-0 w-full mb-6 group">
              <input 
              type="text" 
              name="floating_text" 
              class="peer" 
              placeholder=" " 
              required />
              <label for="floating_text" >First Name</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input 
              type="text" 
              name="floating_text" 
              class="peer" 
              placeholder=" " 
              required />
            <label htmlFor="floating_text">Last Name</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input 
            name="floating_email" 
            type="email"
            class="peer" 
            placeholder=" " 
            required
            />
            <label htmlFor="floating_email">Email</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input 
            name="floating_password" 
            type="password"
            class="peer" 
            placeholder=" " 
            required />
            <label htmlFor="floating_password">Password</label>
          </div>
          <button className="btn-danger" type="submit">Register</button>
          <button className="btn-danger flex justify-between text-center" type="button">
            Continue with Google
            <GoogleIcon color="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

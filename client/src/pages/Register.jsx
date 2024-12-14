import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const [Role, setRole] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [Resume, setResume] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  

  const resumeHandler  = (e) => {
    const file = e.target.files[0];
    setResume(file);
  }

  const {loading,isAuthenticated,error,message} = useSelector((state)=>state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("Role", Role);
      formData.append("Username", Username);
      formData.append("Email", Email);
      formData.append("Phone", Phone);
      formData.append("Address", Address);
      formData.append("Password", Password);
      if (Role === "Job Seeker") {
        formData.append("firstNiche", firstNiche);
        formData.append("secondNiche", secondNiche);
        formData.append("thirdNiche", thirdNiche);
        formData.append("coverLetter", coverLetter);
        formData.append("Resume", Resume);
  }
  dispatch(register(formData));
}

useEffect(() => {
  if (error) {
    // console.log(error)
    toast.error(error);
    dispatch(clearAllUserErrors());
  }
  if (isAuthenticated) {
    navigateTo("/");
  }
}, [dispatch, error, loading, isAuthenticated, message]);

return (
  <>
    <section className="authPage">
      <div className="container">
        <div className="header">
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="wrapper">
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select
                  value={Role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Register as an Employer</option>
                  <option value="Job Seeker">Register as a Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="111-222-333"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label>Address</label>
              <div>
                <input
                  type="text"
                  placeholder="Your Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FaAddressBook />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
          </div>
          {Role === "Job Seeker" && (
            <>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Your First Niche</label>
                  <div>
                    <select
                      value={firstNiche}
                      onChange={(e) => setFirstNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => {
                        return (
                          <option key={index} value={niche}>
                            {niche}
                          </option>
                        );
                      })}
                    </select>
                    <MdCategory />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Your Second Niche</label>
                  <div>
                    <select
                      value={secondNiche}
                      onChange={(e) => setSecondNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => {
                        return (
                          <option key={index} value={niche}>
                            {niche}
                          </option>
                        );
                      })}
                    </select>
                    <MdCategory />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Your Third Niche</label>
                  <div>
                    <select
                      value={thirdNiche}
                      onChange={(e) => setThirdNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => {
                        return (
                          <option key={index} value={niche}>
                            {niche}
                          </option>
                        );
                      })}
                    </select>
                    <MdCategory />
                  </div>
                </div>
              </div>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Coverletter</label>
                  <div>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={10}
                    />
                  </div>
                </div>
              </div>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Resume</label>
                  <div>
                    <input
                      type="file"
                      onChange={resumeHandler}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <button type="submit" disabled={loading}>
            Register
          </button>
          <Link to={"/login"}>Login Now</Link>
        </form>
      </div>
    </section>
  </>
);
}
export default Register ;
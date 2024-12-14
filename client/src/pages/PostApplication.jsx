import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchsinglejob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const { singleJOb } = useSelector((state) => state.jobs);
  const  {user,isAuthenticated}  = useSelector((state) => 
    
    state.user
  );
  console.log("Test log",isAuthenticated);
  
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );

  const { jobid } = useParams();

  console.log("User:", user);
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("Role:", user?.role);

  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("Resume", resume);
    }
    dispatch(postApplication(formData, jobid));
  };

  useEffect(() => {
    if (user) {
      console.log("User data:", user); // Check the structure
      setName(user.Username || "");
      setEmail(user.Email || "");
      setPhone(user.Phone || "");
      setAddress(user.Address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchsinglejob(jobid));
  }, [dispatch, error, message, jobid, user]);
  
  let qualifications = [];
  let responsibilities = [];
  let offering = [];
  
  if (singleJOb && singleJOb.qualifications) {
    qualifications = singleJOb.qualifications.split(". ");
  }
  if (singleJOb && singleJOb.responsibilities) {
    responsibilities = singleJOb.responsibilities.split(". ");
  }
  if (singleJOb && singleJOb.offers) {
    offering = singleJOb.offers.split(". ");
  }
  
  console.log("Job Details:", singleJOb);
  

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <>
      <article className="application_page">
        <form>
          <h3>Application Form</h3>
          <div>
            <label>Job Title</label>
            <input type="text" placeholder={singleJOb.title} disabled />
          </div>
          <div>
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {user && user.Role
 === "Job Seeker" && (
            <>
              <div>
                <label>Coverletter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                />
              </div>
              <div>
                <label>Resume</label>
                <input type="file" onChange={resumeHandler} />
              </div>
            </>
          )}

          {isAuthenticated && user?.Role === "Job Seeker" && (
            <div style={{ alignItems: "flex-end" }}>
              <button
                className="btn"
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply
              </button>
            </div>
          )}
        </form>

        <div className="job-details">
          <header>
            <h3>{singleJOb.title}</h3>
            {singleJOb.personalWebsite && (
              <Link target="_blank" to={singleJOb.personalWebsite.url}>
                {singleJOb.personalWebsite.title}
              </Link>
            )}
            <p>{singleJOb.location}</p>
            <p>Rs. {singleJOb.salary} a month</p>
          </header>
          <hr />
          <section>
            <div className="wrapper">
              <h3>Job details</h3>
              <div>
                <IoMdCash />
                <div>
                  <span>Pay</span>
                  <span>{singleJOb.salary} a month</span>
                </div>
              </div>
              <div>
                <FaToolbox />
                <div>
                  <span>Job type</span>
                  <span>{singleJOb.jobType}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Location</h3>
              <div className="location-wrapper">
                <FaLocationDot />
                <span>{singleJOb.location}</span>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Full Job Description</h3>
              <p>{singleJOb.introduction}</p>
              {singleJOb.qualifications && (
                <div>
                  <h4>Qualifications</h4>
                  <ul>
                    {qualifications.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJOb.responsibilities && (
                <div>
                  <h4>Responsibilities</h4>
                  <ul>
                    {responsibilities.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJOb.offers && (
                <div>
                  <h4>Offering</h4>
                  <ul>
                    {offering.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr />
          <footer>
            <h3>Job Niche</h3>
            <p>{singleJOb.jobNiche}</p>
          </footer>
        </div>
      </article>
    </>
  );
};

export default PostApplication;
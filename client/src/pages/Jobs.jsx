// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Spinner from '../components/Spinner';
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";


// const Jobs = () => {
//   const [city, setCity] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [niche, setNiche] = useState("");
//   const [selectedNiche, setSelectedNiche] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");

//   const { jobs, loading, error } = useSelector((state) => state.jobs);

//   const handleCityChange = (city) => {
//     setCity(city);
//     setSelectedCity(city);
//   };
//   const handleNicheChange = (niche) => {
//     setNiche(niche);
//     setSelectedNiche(niche);
//   };

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   }, [dispatch, city, niche, searchKeyword]);
  
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllJobErrors());
//     }
//   }, [error, dispatch]);
  

//   const handleSearch = () => {
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   };
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import { debounce } from 'lodash';

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  // Debounce the fetch jobs function
  const debouncedFetchJobs = useCallback(
    debounce((city, niche, searchKeyword) => {
      dispatch(fetchJobs(city, niche, searchKeyword));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedFetchJobs(city, niche, searchKeyword);
    
    // Cleanup
    return () => {
      debouncedFetchJobs.cancel();
    };
  }, [debouncedFetchJobs, city, niche, searchKeyword]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
  }, [error, dispatch]);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  const cities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Quetta",
    "Peshawar",
    "Sialkot",
    "Gujranwala",
    "Sargodha",
    "Bahawalpur",
    "Sukkur",
    "Mardan",
    "Mingora",
    "Sheikhupura",
    "Mandi Bahauddin",
    "Larkana",
    "Nawabshah",
  ];

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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((city, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((niche, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div className="jobs_container">
                {jobs &&
                  jobs.map((element) => {
                    return (
                      <div className="card" key={element._id}>
                        {element.hiringMultipleCandidates === "Yes" ? (
                          <p className="hiring-multiple">
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className="hiring">Hiring</p>
                        )}
                        <p className="title">{element.title}</p>
                        <p className="company">{element.companyName}</p>
                        <p className="location">{element.location}</p>
                        <p className="salary">
                          <span>Salary:</span> Rs. {element.salary}
                        </p>
                        <p className="posted">
                          <span>Posted On:</span>{" "}
                          {element.jobPostedOn.substring(0, 10)}
                        </p>
                        <div className="btn-wrapper">
                          <Link
                            className="btn"
                            to={`/post/application/${element._id}`}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;

// const Jobs = () => {
//   const [city, setCity] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [niche, setNiche] = useState("");
//   const [selectedNiche, setSelectedNiche] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");

//   const  {jobs , loading , error} = useSelector((state)=>state.jobs);

//   const handleCityChange = (city) => {
//     setCity(city);
//     setSelectedCity(city);
//   };
//   const handleNicheChange = (niche) => {
//     setNiche(niche);
//     setSelectedNiche(niche);
//   };

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllJobErrors());
//     }
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   }, [dispatch, error, city, niche]);

//   const handleSearch = () => {
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   };

//   const cities = [
//     "Karachi",
//     "Lahore",
//     "Islamabad",
//     "Rawalpindi",
//     "Faisalabad",
//     "Multan",
//     "Hyderabad",
//     "Quetta",
//     "Peshawar",
//     "Sialkot",
//     "Gujranwala",
//     "Sargodha",
//     "Bahawalpur",
//     "Sukkur",
//     "Mardan",
//     "Mingora",
//     "Sheikhupura",
//     "Mandi Bahauddin",
//     "Larkana",
//     "Nawabshah",
//   ];

//   const nichesArray = [
//     "Software Development",
//     "Web Development",
//     "Cybersecurity",
//     "Data Science",
//     "Artificial Intelligence",
//     "Cloud Computing",
//     "DevOps",
//     "Mobile App Development",
//     "Blockchain",
//     "Database Administration",
//     "Network Administration",
//     "UI/UX Design",
//     "Game Development",
//     "IoT (Internet of Things)",
//     "Big Data",
//     "Machine Learning",
//     "IT Project Management",
//     "IT Support and Helpdesk",
//     "Systems Administration",
//     "IT Consulting",
//   ];

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <section className="jobs">
//           <div className="search-tab-wrapper">
//             <input
//               type="text"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//             />
//             <button onClick={handleSearch}>Find Job</button>
//             <FaSearch />
//           </div>
//           <div className="wrapper">
//             <div className="filter-bar">
//               <div className="cities">
//                 <h2>Filter Job By City</h2>
//                 {cities.map((city, index) => (
//                   <div key={index}>
//                     <input
//                       type="radio"
//                       id={city}
//                       name="city"
//                       value={city}
//                       checked={selectedCity === city}
//                       onChange={() => handleCityChange(city)}
//                     />
//                     <label htmlFor={city}>{city}</label>
//                   </div>
//                 ))}
//               </div>
//               <div className="cities">
//                 <h2>Filter Job By Niche</h2>
//                 {nichesArray.map((niche, index) => (
//                   <div key={index}>
//                     <input
//                       type="radio"
//                       id={niche}
//                       name="niche"
//                       value={niche}
//                       checked={selectedNiche === niche}
//                       onChange={() => handleNicheChange(niche)}
//                     />
//                     <label htmlFor={niche}>{niche}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="container">
//               <div className="mobile-filter">
//                 <select value={city} onChange={(e) => setCity(e.target.value)}>
//                   <option value="">Filter By City</option>
//                   {cities.map((city, index) => (
//                     <option value={city} key={index}>
//                       {city}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={niche}
//                   onChange={(e) => setNiche(e.target.value)}
//                 >
//                   <option value="">Filter By Niche</option>
//                   {nichesArray.map((niche, index) => (
//                     <option value={niche} key={index}>
//                       {niche}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="jobs_container">
//                 {jobs &&
//                   jobs.map((element) => {
//                     return (
//                       <div className="card" key={element._id}>
//                         {element.hiringMultipleCandidates === "Yes" ? (
//                           <p className="hiring-multiple">
//                             Hiring Multiple Candidates
//                           </p>
//                         ) : (
//                           <p className="hiring">Hiring</p>
//                         )}
//                         <p className="title">{element.title}</p>
//                         <p className="company">{element.companyName}</p>
//                         <p className="location">{element.location}</p>
//                         <p className="salary">
//                           <span>Salary:</span> Rs. {element.salary}
//                         </p>
//                         <p className="posted">
//                           <span>Posted On:</span>{" "}
//                           {element.jobPostedOn.substring(0, 10)}
//                         </p>
//                         <div className="btn-wrapper">
//                           <Link
//                             className="btn"
//                             to={`/post/application/${element._id}`}
//                           >
//                             Apply Now
//                           </Link>
//                         </div>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Jobs

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Spinner from '../components/Spinner';
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
// import { debounce } from "lodash";

// const Jobs = () => {
//   const [filters, setFilters] = useState({
//     city: "",
//     niche: "",
//     searchKeyword: "",
//   });

//   const { jobs, loading, error } = useSelector((state) => state.jobs);
//   const dispatch = useDispatch();

//   const debouncedFetchJobs = debounce(() => {
//     dispatch(fetchJobs(filters.city, filters.niche, filters.searchKeyword));
//   }, 300);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllJobErrors());
//     }
//   }, [dispatch, error]);

//   const handleFilterChange = (field, value) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
//     debouncedFetchJobs();
//   };

//   const cities = [
//         "Karachi",
//         "Lahore",
//         "Islamabad",
//         "Rawalpindi",
//         "Faisalabad",
//         "Multan",
//         "Hyderabad",
//         "Quetta",
//         "Peshawar",
//         "Sialkot",
//         "Gujranwala",
//         "Sargodha",
//         "Bahawalpur",
//         "Sukkur",
//         "Mardan",
//         "Mingora",
//         "Sheikhupura",
//         "Mandi Bahauddin",
//         "Larkana",
//         "Nawabshah",
//       ];
//   const nichesArray = [
//     "Software Development",
//     "Web Development",
//     "Cybersecurity",
//     "Data Science",
//     "Artificial Intelligence",
//     "Cloud Computing",
//     "DevOps",
//     "Mobile App Development",
//     "Blockchain",
//     "Database Administration",
//     "Network Administration",
//     "UI/UX Design",
//     "Game Development",
//     "IoT (Internet of Things)",
//     "Big Data",
//     "Machine Learning",
//     "IT Project Management",
//     "IT Support and Helpdesk",
//     "Systems Administration",
//     "IT Consulting",
//   ];

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <section className="jobs">
//           <div className="search-tab-wrapper">
//             <input
//               type="text"
//               value={filters.searchKeyword}
//               onChange={(e) => handleFilterChange("searchKeyword", e.target.value)}
//               placeholder="Search jobs..."
//             />
//             <button onClick={debouncedFetchJobs}>Find Job</button>
//             <FaSearch />
//           </div>
//           <div className="wrapper">
//             <div className="filter-bar">
//               <h2>Filter Jobs</h2>
//               <div className="cities">
//                 <h3>By City</h3>
//                 {cities.map((city) => (
//                   <div key={city}>
//                     <input
//                       type="radio"
//                       id={city}
//                       name="city"
//                       value={city}
//                       checked={filters.city === city}
//                       onChange={() => handleFilterChange("city", city)}
//                     />
//                     <label htmlFor={city}>{city}</label>
//                   </div>
//                 ))}
//               </div>
//               <div className="niches">
//                 <h3>By Niche</h3>
//                 {nichesArray.map((niche) => (
//                   <div key={niche}>
//                     <input
//                       type="radio"
//                       id={niche}
//                       name="niche"
//                       value={niche}
//                       checked={filters.niche === niche}
//                       onChange={() => handleFilterChange("niche", niche)}
//                     />
//                     <label htmlFor={niche}>{niche}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="jobs_container">
//               {jobs && jobs.length > 0 ? (
//                 jobs.map((job) => (
//                   <div className="card" key={job._id}>
//                     <p className="title">{job.title || "Job Title"}</p>
//                     <p className="company">{job.companyName || "Company Name"}</p>
//                     <p className="location">{job.location || "Location not specified"}</p>
//                     <p className="salary">Rs. {job.salary || "Not disclosed"}</p>
//                     <p className="posted">
//                       Posted On: {job.jobPostedOn?.substring(0, 10) || "Unknown"}
//                     </p>
//                     <Link className="btn" to={`/post/application/${job._id}`}>
//                       Apply Now
//                     </Link>
//                   </div>
//                 ))
//               ) : (
//                 <p>No jobs found for the selected filters.</p>
//               )}
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Jobs;
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
// import Spinner from "../components/Spinner";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Jobs = () => {
//   const [city, setCity] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [niche, setNiche] = useState("");
//   const [selectedNiche, setSelectedNiche] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");

//   const { jobs, loading, error } = useSelector((state) => state.jobs);

//   const handleCityChange = (city) => {
//     setCity(city);
//     setSelectedCity(city);
//   };
//   const handleNicheChange = (niche) => {
//     setNiche(niche);
//     setSelectedNiche(niche);
//   };

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllJobErrors());
//     }
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   }, [dispatch, error, city, niche]);

//   const handleSearch = () => {
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   };

//   const cities = [
//     "Karachi",
//     "Lahore",
//     "Islamabad",
//     "Rawalpindi",
//     "Faisalabad",
//     "Multan",
//     "Hyderabad",
//     "Quetta",
//     "Peshawar",
//     "Sialkot",
//     "Gujranwala",
//     "Sargodha",
//     "Bahawalpur",
//     "Sukkur",
//     "Mardan",
//     "Mingora",
//     "Sheikhupura",
//     "Mandi Bahauddin",
//     "Larkana",
//     "Nawabshah",
//   ];

//   const nichesArray = [
//     "Software Development",
//     "Web Development",
//     "Cybersecurity",
//     "Data Science",
//     "Artificial Intelligence",
//     "Cloud Computing",
//     "DevOps",
//     "Mobile App Development",
//     "Blockchain",
//     "Database Administration",
//     "Network Administration",
//     "UI/UX Design",
//     "Game Development",
//     "IoT (Internet of Things)",
//     "Big Data",
//     "Machine Learning",
//     "IT Project Management",
//     "IT Support and Helpdesk",
//     "Systems Administration",
//     "IT Consulting",
//   ];

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <section className="jobs">
//           <div className="search-tab-wrapper">
//             <input
//               type="text"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//             />
//             <button onClick={handleSearch}>Find Job</button>
//             <FaSearch />
//           </div>
//           <div className="wrapper">
//             <div className="filter-bar">
//               <div className="cities">
//                 <h2>Filter Job By City</h2>
//                 {cities.map((city, index) => (
//                   <div key={index}>
//                     <input
//                       type="radio"
//                       id={city}
//                       name="city"
//                       value={city}
//                       checked={selectedCity === city}
//                       onChange={() => handleCityChange(city)}
//                     />
//                     <label htmlFor={city}>{city}</label>
//                   </div>
//                 ))}
//               </div>
//               <div className="cities">
//                 <h2>Filter Job By Niche</h2>
//                 {nichesArray.map((niche, index) => (
//                   <div key={index}>
//                     <input
//                       type="radio"
//                       id={niche}
//                       name="niche"
//                       value={niche}
//                       checked={selectedNiche === niche}
//                       onChange={() => handleNicheChange(niche)}
//                     />
//                     <label htmlFor={niche}>{niche}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="container">
//               <div className="mobile-filter">
//                 <select value={city} onChange={(e) => setCity(e.target.value)}>
//                   <option value="">Filter By City</option>
//                   {cities.map((city, index) => (
//                     <option value={city} key={index}>
//                       {city}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={niche}
//                   onChange={(e) => setNiche(e.target.value)}
//                 >
//                   <option value="">Filter By Niche</option>
//                   {nichesArray.map((niche, index) => (
//                     <option value={niche} key={index}>
//                       {niche}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="jobs_container">
//                 {jobs &&
//                   jobs.map((element) => {
//                     return (
//                       <div className="card" key={element._id}>
//                         {element.hiringMultipleCandidates === "Yes" ? (
//                           <p className="hiring-multiple">
//                             Hiring Multiple Candidates
//                           </p>
//                         ) : (
//                           <p className="hiring">Hiring</p>
//                         )}
//                         <p className="title">{element.title}</p>
//                         <p className="company">{element.companyName}</p>
//                         <p className="location">{element.location}</p>
//                         <p className="salary">
//                           <span>Salary:</span> Rs. {element.salary}
//                         </p>
//                         <p className="posted">
//                           <span>Posted On:</span>{" "}
//                           {element.jobPostedOn.substring(0, 10)}
//                         </p>
//                         <div className="btn-wrapper">
//                           <Link
//                             className="btn"
//                             to={`/post/application/${element._id}`}
//                           >
//                             Apply Now
//                           </Link>
//                         </div>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Jobs;

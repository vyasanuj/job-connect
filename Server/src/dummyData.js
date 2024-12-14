import axios from "axios";
import { faker } from '@faker-js/faker'; // Import Faker.js

function generateJobs(num) {
  const jobNiches = [
    "Software Development", "Cybersecurity", "Data Science", 
    "Mobile Development", "Frontend Development", "Backend Development", 
    "Cloud Computing", "AI/ML", "DevOps", "UI/UX Design"
  ];
  
  const jobTypes = ["Full-time", "Part-time"];
  const locations = ["Karachi", "Lahore", "Islamabad", "Remote", "New York", "San Francisco"];
  
  const jobs = [];
  
  for (let i = 0; i < num; i++) {
    const job = {
      title: faker.person.jobTitle(),
      jobType: faker.helpers.arrayElement(jobTypes),
      location: faker.helpers.arrayElement(locations),
      companyName: faker.company.name(), // Updated method
      introduction: `Join our team as a ${faker.person.jobType()}.`,
      responsibilities: faker.lorem.sentence(),
      qualifications: `Bachelor's degree in ${faker.person.jobArea()} or related field.`,
      offers: `${faker.helpers.arrayElement(["Health insurance", "Remote work options", "Training support"])}, ${faker.helpers.arrayElement(["401k", "Stock options", "Relocation support"])}`,
      salary:faker.number.int({ min: 50000, max: 200000 }).toString(),
      hiringMultipleCandidates: faker.datatype.boolean() ? "Yes" : "No",
      personalWebsitetitle: faker.company.name(),
      personalWebsiteurl: faker.internet.url(),
      jobNiche: faker.helpers.arrayElement(jobNiches)
    };
    
    jobs.push(job);
  }
  
  return jobs;
}

// Generate 1000 job listings
const jobs = generateJobs(2000);
console.log(JSON.stringify(jobs, null, 2));
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVkNmMzMmVmNDc5NmQ1NzczZmEwNGMiLCJpYXQiOjE3MzQxNzY4MjQsImV4cCI6MTczNDI2MzIyNH0.tRoRytS2-ao2vFq4uz7QAyGJFLF9pMcTLfKwOm7RpTM";
jobs.map((job) => {
  axios
    .post(
      "http://localhost:8000/api/v1/job/post",
      job,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${BEARER_TOKEN}`
        }
      },
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

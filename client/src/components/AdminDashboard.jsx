  import React from 'react'
  import SchoolIcon from '@mui/icons-material/School';
  import AssessmentIcon from '@mui/icons-material/Assessment';
  import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
  import ArticleIcon from '@mui/icons-material/Article';
  import AnalyticsIcon from '@mui/icons-material/Analytics';
  import AccountBoxIcon from '@mui/icons-material/AccountBox';
  import { Card, Typography, TypographyStylesType } from '@material-tailwind/react';
  import { useNavigate } from 'react-router-dom';

  export default function AdminDashboard() {
    const navigate = useNavigate()
    return (
      <Card className='container bg-cyan-800 mx-auto my-5 p-10 space-y-10 rounded-2xl'>
        <div className='flex flex-row space-x-10'>
          <div onClick={()=>{navigate("/curriculum")}} className='container p-6 bg-white flex flex-col rounded-2xl hover:bg-gray-100 hover:shadow-2xl hover:scale-110'>
              <SchoolIcon style={{color:'black', width:'6rem', height:'6rem', margin:'auto'}}/>
              <Typography className='mx-auto font-sans' variant='h5'>Curriculum</Typography>
              <hr class="w-48 h-1 mx-auto my-0 bg-black border-0 rounded md:my-1 dark:bg-gray-700"></hr>
              <Typography className='text-justify text-center' variant='h6'>Design Curriculum, Specify POs, Design Courses, Specify and map COs-POs etc. </Typography>
          </div>

          <div onClick={()=>{navigate("/assesment")}} className='container p-6 bg-white flex flex-col rounded-2xl hover:bg-gray-100 hover:shadow-2xl hover:scale-105 '>
              <AssessmentIcon style={{color:'black', width:'6rem', height:'6rem', margin:'auto'}}/>
              <Typography className='mx-auto font-sans' variant='h5'>Assessment</Typography>
              <hr class="w-48 h-1 mx-auto my-0 bg-black border-0 rounded md:my-1 dark:bg-gray-700"></hr>
              <Typography className='text-justify text-center' variant='h6'>Manage, add, edit CIA and ECE Question papers and Assessment Occassions</Typography>
          </div>

          <div onClick={()=>{navigate("/attainment")}} className='container p-6 bg-white flex flex-col rounded-2xl hover:bg-gray-100 hover:shadow-2xl hover:scale-105'>
              <EmojiEventsIcon style={{color:'black', width:'6rem', height:'6rem', margin:'auto'}}/>
              <Typography className='mx-auto font-sans' variant='h5'>Attainment</Typography>
              <hr class="w-48 h-1 mx-auto my-0 bg-black border-0 rounded md:my-1 dark:bg-gray-700"></hr>
              <Typography className='text-justify text-center' variant='h6'>Define threshold levels, Check course/program/consolidated Attainment</Typography>
          </div>
        </div>

        <div className='flex flex-row space-x-10'>
          <div className='container p-6 bg-white flex flex-col rounded-2xl hover:bg-gray-100 hover:shadow-2xl hover:scale-105'>
              <ArticleIcon style={{color:'black', width:'6rem', height:'6rem', margin:'auto'}}/>
              <Typography className='mx-auto font-sans' variant='h5'>Reports</Typography>
              <hr class="w-48 h-1 mx-auto my-0 bg-black border-0 rounded md:my-1 dark:bg-gray-700"></hr>
              <Typography className='text-justify text-center' variant='h6'>Genrate various reports on the basis pg mappings and generate course plans</Typography>
          </div>

          <div className='container p-6 bg-white flex flex-col rounded-2xl hover:bg-gray-100 hover:shadow-2xl hover:scale-105'>
              <AnalyticsIcon style={{color:'black', width:'6rem', height:'6rem', margin:'auto'}}/>
              <Typography className='mx-auto font-sans' variant='h5'>Resources</Typography>
              <hr class="w-48 h-1 mx-auto my-0 bg-black border-0 rounded md:my-1 dark:bg-gray-700"></hr>
              <Typography className='text-justify text-center' variant='h6'>Watch video tutorials, read books, know how to use this system as an educator</Typography>
          </div>

          <div 
              onClick={()=>{navigate('./profile')}} 
              className='container p-6 bg-white flex flex-col rounded-2xl hover:bg-gray-100 hover:shadow-2xl hover:scale-105'>
              <AccountBoxIcon style={{color:'black', width:'6rem', height:'6rem', margin:'auto'}}/>
              <Typography className='mx-auto font-sans' variant='h5'>Profile</Typography>
              <hr class="w-48 h-1 mx-auto my-0 bg-black border-0 rounded md:my-1 dark:bg-gray-700"></hr>
              <Typography className='text-justify text-center' variant='h6'>Manage profile, view academic details, edit user details</Typography>
          </div>
        </div>
      </Card>
    )
  }

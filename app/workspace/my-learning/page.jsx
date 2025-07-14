import React from 'react'
import WelcomeBanner from '../_components/welcomeBanner'
import EnrolledCourseList from '../_components/enrolledCourseList'

function MyLearning() {
  return (
    <div>
        <WelcomeBanner/>
        <h2 className='font-bold text-xl mb-4'>My Learning</h2>
        <EnrolledCourseList/>
    </div>
  )
}

export default MyLearning
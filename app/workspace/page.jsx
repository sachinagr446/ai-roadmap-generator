import React from 'react'
import WelcomeBanner from './_components/welcomeBanner'
import CourseList from './_components/courseList'
import EnrolledCourseList from './_components/enrolledCourseList'

function Workspace() {
  return (
    <div ><WelcomeBanner/>
      <EnrolledCourseList/>
        <CourseList/>
    </div>
  )
}

export default Workspace
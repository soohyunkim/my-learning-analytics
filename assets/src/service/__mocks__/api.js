import useFetch from '../../hooks/useFetch'

export const useGradeData = () => [
  true, [
    {
      current_grade: 85,
      current_user_grade: '80.83',
      graph_upper_limit: 100,
      tot_students: 23,
      grade_avg: 87.75
    },
    {
      current_grade: 83,
      current_user_grade: '80.83',
      graph_upper_limit: 100,
      tot_students: 23,
      grade_avg: 87.75
    }]
]
export const useAssignmentPlanningData = (currentCourseId, assignmentFilter) => useFetch(`http://localhost:5001/api/v1/courses/${currentCourseId}/assignments?percent=${assignmentFilter}`)
export const useFilesAccessedAssignmentData = (currentCourseId) => useFetch(`http://localhost:5001/api/v1/courses/${currentCourseId}/assignments?percent=0`)

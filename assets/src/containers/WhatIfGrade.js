import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Spinner from '../components/Spinner'
import GradeSlider from '../components/GradeSlider'
import { roundToOneDecimcal } from '../util/math'
import { useAssignmentPlanningData } from '../service/api'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 8
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse'
  },
  tableHeadCell: {
    color: 'inherit',
    fontSize: '1em'
  },
  tableCell: {
    lineHeight: '1.42857143',
    padding: '12px 8px',
    verticalAlign: 'middle'
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
})

function WhatIfGrade (props) {
  const { classes, match } = props
  const currentCourseId = match.params.courseId

  const [assignments, setAssignments] = useState(null)
  const [actualGrade, setActualGrade] = useState(0)
  const [whatIfGrade, setWhatIfGrade] = useState(0)
  const [showWeightedScores, setShowWeightedScores] = useState(false)
  const [loaded, assignmentData] = useAssignmentPlanningData(currentCourseId, 0)

  useEffect(() => {
    if (loaded) {
      const assignments = assignmentData.progress.reduce((acc, assignment, i) => {
        const assignmentName = assignment.name
        const isGraded = assignment.graded
        const actualGrade = isGraded ? roundToOneDecimcal(assignment.score / assignment.points_possible * 100) : null
        const percentOfFinalGrade = assignment.towards_final_grade
        acc[i] = {
          assignmentName,
          isGraded,
          actualGrade,
          percentOfFinalGrade,
          whatIfGrade: isGraded ? actualGrade : 100
        }
        return acc
      }, {})
      setAssignments(assignments)
    }
  }, [loaded])

  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant='h5' gutterBottom>What If Grade Calculator</Typography>
            {assignments
              ? <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {[
                      'Assignment Name',
                      'Actual Grade',
                      'What-If Grade'
                    ].map((prop, key) => {
                      return (
                        <TableCell
                          className={classes.tableCell + ' ' + classes.tableHeadCell}
                          key={key}
                        >
                          {prop}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(assignments).map(key => {
                    return (
                      <TableRow key={key}>
                        <TableCell className={classes.tableCell}>
                          {assignments[key].assignmentName}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {assignments[key].isGraded
                            ? `${assignments[key].actualGrade}%`
                            : null}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <GradeSlider
                            grade={assignments[key].whatIfGrade}
                            setWhatIfGrade={whatIfGrade => {
                              const assignment = assignments[key]
                              assignment.whatIfGrade = whatIfGrade
                              setAssignments({ ...assignments, [key]: assignment })
                            }}
                            isGraded={assignments[key].isGraded}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                  }
                </TableBody>
              </Table> : <Spinner />}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(WhatIfGrade)

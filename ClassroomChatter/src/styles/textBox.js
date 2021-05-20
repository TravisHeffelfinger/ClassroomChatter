// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     // '& > *': {
//      margin: theme.spacing(2),
//     //   width: theme.spacing(16),
//     //   height: theme.spacing(16),
//     // }
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: '25ch',
//   },
// }));

// export default function TextFields() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Container maxWidth='lg'>

//         <Paper elevation={1}>
//           <TextField
//             id="outlined-full-width"
//             label="Label"
//             style={{ margin: 8 }}
//             placeholder="Placeholder"
//             helperText="Full width!"
//             fullWidth
//             multiline
//             margin="normal"
//             InputLabelProps={{
//               shrink: true,
//             }}
//             variant="outlined"
//           />
//         </Paper>
//       </Container>
//     </div>
//   );
// }
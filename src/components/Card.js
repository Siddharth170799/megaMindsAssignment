// // import React from 'react';
// // import { Card, CardContent, Typography, CardMedia, Button, CardActions } from '@mui/material';

// // const BookCard = ({ title, author, imageUrl }) => {
// //   return (
// //     <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
// //       <CardMedia
// //         component="img"
// //         height="140"
// //         image={"https://images.pexels.com/photos/1976971/pexels-photo-1976971.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
// //         alt={title}
// //       />
// //       <CardContent>
// //         <Typography variant="h6" component="div">
// //           Title : {title}
// //         </Typography>
// //         <Typography variant="body2" color="text.secondary">
// //           {author}
// //         </Typography>
// //       </CardContent>
// //       <CardActions>
     
// //       </CardActions>
// //     </Card>
// //   );
// // };

// // export default BookCard;
// import React from 'react';
// import { Card, CardContent, Typography, CardMedia, Button, CardActions } from '@mui/material';

// const BookCard = ({ title, author, imageUrl }) => {
//   return (
//     <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image={imageUrl || "https://images.pexels.com/photos/1976971/pexels-photo-1976971.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
//         alt={title}
//       />
//       <CardContent>
//         <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//           Title: 
//           <span style={{ fontWeight: 'normal' }}> {title}</span>
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
//           Author: 
//           <span style={{ fontWeight: 'normal' }}> {author}</span>
//         </Typography>
//       </CardContent>
//       <CardActions>
//         {/* Add any actions or buttons here if needed */}
//       </CardActions>
//     </Card>
//   );
// };

// export default BookCard;
import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material';

const BookCard = ({ title, author, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl || "https://images.pexels.com/photos/1976971/pexels-photo-1976971.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
        alt={title}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Title: 
          <span style={{ fontWeight: 'normal' }}> {title}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, textAlign: 'center' }}>
          Author: 
          <span style={{ fontWeight: 'normal' }}> {author}</span>
        </Typography>
      </CardContent>
      <CardActions>
        {/* Add any actions or buttons here if needed */}
      </CardActions>
    </Card>
  );
};

export default BookCard;

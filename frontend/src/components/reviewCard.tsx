import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface reviewProps {
  review: string;
  date: string;
}

const ReviewCard: React.FC<reviewProps> = ({review, date}) => {

  const fixDate = (date: string) => {
    return date.slice(5, 7) + '/' + date.slice(8, 10) + '/' + date.slice(0, 4);
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {review}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {fixDate(date)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ReviewCard
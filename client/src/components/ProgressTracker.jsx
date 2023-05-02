import LinearProgressWithLabel from '@mui/material/LinearProgress';

export default function ProgressTracker({ progress }) {
    return (
      <div>
        <LinearProgressWithLabel 
          color="inherit" 
          value={progress} 
          variant="determinate"  
        />
      </div>
    );
  }
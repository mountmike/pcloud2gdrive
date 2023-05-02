import LinearProgressWithLabel from '@mui/material/LinearProgress';

export default function ProgressTracker({ progress, colour }) {
    return (
      <div>
        <LinearProgressWithLabel 
          color={colour} 
          value={progress} 
          variant="determinate"  
        />
      </div>
    );
  }
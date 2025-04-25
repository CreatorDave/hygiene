import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';

interface HealthIssue {
  id: string;
  name: string;
  description: string;
  date: string;
}

const HealthTracker = () => {
  const { user } = useAuth();
  const [issueName, setIssueName] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [healthIssues, setHealthIssues] = useState<HealthIssue[]>([]);

  const handleAddIssue = () => {
    if (issueName.trim() && issueDescription.trim()) {
      const newIssue: HealthIssue = {
        id: Date.now().toString(),
        name: issueName,
        description: issueDescription,
        date: new Date().toLocaleDateString(),
      };
      setHealthIssues([...healthIssues, newIssue]);
      setIssueName('');
      setIssueDescription('');
    }
  };

  const handleDeleteIssue = (id: string) => {
    setHealthIssues(healthIssues.filter(issue => issue.id !== id));
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Health Tracker
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Health Issue"
                value={issueName}
                onChange={(e) => setIssueName(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddIssue}
                fullWidth
              >
                Add Health Issue
              </Button>
            </Grid>
          </Grid>

          <List sx={{ mt: 4 }}>
            {healthIssues.map((issue) => (
              <Paper
                key={issue.id}
                elevation={2}
                sx={{ mb: 2, p: 2 }}
              >
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteIssue(issue.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={issue.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {issue.description}
                        </Typography>
                        <br />
                        <Typography component="span" variant="caption" color="text.secondary">
                          {issue.date}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default HealthTracker; 
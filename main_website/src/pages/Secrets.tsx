// @ts-nocheck
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

const INITIAL_FORM = {
  personName: '',
  wifiName: '',
  wifiPassword: '',
  securityQuestion: '',
  securityAnswer: '',
};

const INITIAL_EDIT_STATE = {
  open: false,
  entryId: null,
  question: '',
  answer: '',
  detail: null,
  error: null,
  step: 'question',
  loading: false,
  saving: false,
  newSecurityAnswer: '',
};

const sortEntries = (items) =>
  [...items].sort((a, b) => {
    const left = b.updatedAt ?? b.createdAt ?? '';
    const right = a.updatedAt ?? a.createdAt ?? '';
    return left.localeCompare(right);
  });

export function Secrets() {
  const [entries, setEntries] = useState([]);
  const [listError, setListError] = useState(null);
  const [loadingEntries, setLoadingEntries] = useState(true);

  const [formState, setFormState] = useState(INITIAL_FORM);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: null, text: null });

  const [editState, setEditState] = useState(INITIAL_EDIT_STATE);

  const fetchEntries = useCallback(async () => {
    try {
      setLoadingEntries(true);
      const response = await fetch('/api/secrets', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const payload = await response.json();
      const summaries = Array.isArray(payload.entries) ? payload.entries : [];
      setEntries(sortEntries(summaries));
      setListError(null);
    } catch (error) {
      console.error('[Secrets] failed to load entries', error);
      setListError(error instanceof Error ? error.message : 'Unable to load entries');
    } finally {
      setLoadingEntries(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleFormChange = useCallback((key) => (event) => {
    setFormState((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  }, []);

  const handleCreate = useCallback(
    async (event) => {
      event.preventDefault();
      if (formSubmitting) {
        return;
      }
      setFormSubmitting(true);
      setFormMessage({ type: null, text: null });
      try {
        const response = await fetch('/api/secrets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload?.message ?? 'Failed to save secret');
        }
        const created = payload?.entry;
        if (created) {
          setEntries((prev) => sortEntries([created, ...prev]));
        }
        setFormState(INITIAL_FORM);
        setFormMessage({ type: 'success', text: 'Wi-Fi entry saved.' });
      } catch (error) {
        setFormMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'Unable to save Wi-Fi entry',
        });
      } finally {
        setFormSubmitting(false);
      }
    },
    [formState, formSubmitting],
  );

  const openEditDialog = useCallback((entry) => {
    setEditState({
      ...INITIAL_EDIT_STATE,
      open: true,
      entryId: entry?.id ?? null,
      question: entry?.securityQuestion ?? '',
      loading: false,
      step: 'question',
    });
  }, []);

  const closeEditDialog = useCallback(() => {
    setEditState(INITIAL_EDIT_STATE);
  }, []);

  const handleVerifyAnswer = useCallback(async () => {
    if (!editState.entryId || editState.loading || editState.answer.trim().length === 0) {
      setEditState((prev) => ({
        ...prev,
        error: prev.answer.trim().length === 0 ? 'Answer is required' : prev.error,
      }));
      return;
    }
    setEditState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const response = await fetch(`/api/secrets/${encodeURIComponent(editState.entryId)}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: editState.answer }),
      });
      const payload = await response.json().catch(() => ({}));
      if (response.status === 404) {
        setEntries((prev) => prev.filter((item) => item.id !== editState.entryId));
        throw new Error('Entry not found. It may have been deleted.');
      }
      if (response.status === 403) {
        throw new Error('Incorrect answer');
      }
      if (!response.ok) {
        throw new Error(payload?.message ?? 'Failed to verify answer');
      }
      setEditState((prev) => ({
        ...prev,
        loading: false,
        step: 'editing',
        detail: payload?.entry ?? null,
        error: null,
      }));
    } catch (error) {
      setEditState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unable to verify answer',
      }));
    }
  }, [editState.answer, editState.entryId]);

  const handleEditFieldChange = useCallback((field) => (event) => {
    const value = event.target.value;
    setEditState((prev) => ({
      ...prev,
      detail: prev.detail
        ? {
            ...prev.detail,
            [field]: value,
          }
        : prev.detail,
    }));
  }, []);

  const handleEditSave = useCallback(async () => {
    if (!editState.entryId || !editState.detail || editState.saving) {
      return;
    }
    setEditState((prev) => ({
      ...prev,
      saving: true,
      error: null,
    }));
    try {
      const response = await fetch(`/api/secrets/${encodeURIComponent(editState.entryId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personName: editState.detail.personName,
          wifiName: editState.detail.wifiName,
          wifiPassword: editState.detail.wifiPassword,
          securityQuestion: editState.detail.securityQuestion,
          securityAnswer: editState.newSecurityAnswer,
          answer: editState.answer,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (response.status === 403) {
        throw new Error('Incorrect answer');
      }
      if (!response.ok) {
        throw new Error(payload?.message ?? 'Failed to update entry');
      }
      const updated = payload?.entry;
      if (updated) {
        setEntries((prev) => {
          const next = prev.map((item) =>
            item.id === updated.id
              ? {
                  id: updated.id,
                  personName: updated.personName,
                  wifiName: updated.wifiName,
                  securityQuestion: updated.securityQuestion,
                  createdAt: updated.createdAt,
                  updatedAt: updated.updatedAt,
                }
              : item,
          );
          next.sort((a, b) => {
            const left = b.updatedAt ?? b.createdAt ?? '';
            const right = a.updatedAt ?? a.createdAt ?? '';
            return left.localeCompare(right);
          });
          return next;
        });
      }
      closeEditDialog();
    } catch (error) {
      setEditState((prev) => ({
        ...prev,
        saving: false,
        error: error instanceof Error ? error.message : 'Unable to update entry',
      }));
    }
  }, [closeEditDialog, editState.answer, editState.detail, editState.entryId]);

  const handleDelete = useCallback(
    async (id) => {
      const confirmDelete = window.confirm('Delete this Wi-Fi entry? This cannot be undone.');
      if (!confirmDelete) {
        return;
      }
      try {
        const response = await fetch(`/api/secrets/${encodeURIComponent(id)}`, { method: 'DELETE' });
        if (response.status === 404) {
          throw new Error('Entry already removed');
        }
        if (!response.ok) {
          throw new Error('Failed to delete entry');
        }
        setEntries((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Unable to delete entry');
      }
    },
    [],
  );

  const hasEntries = useMemo(() => entries.length > 0, [entries]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: { xs: 4, md: 6 } }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
            Secrets vault
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Share Wi-Fi access securely using personal security questions. Passwords stay hidden
            unless the right answer is provided.
          </Typography>
        </Box>

        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 4 },
            background: 'linear-gradient(160deg, rgba(17,27,43,0.92), rgba(24,38,61,0.94))',
            border: '1px solid rgba(118,180,255,0.16)',
          }}
        >
          <Box component="form" onSubmit={handleCreate}>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>
              Add a new Wi-Fi
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Your name"
                  fullWidth
                  value={formState.personName}
                  onChange={handleFormChange('personName')}
                  placeholder="Optional"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Wi-Fi name (SSID)"
                  fullWidth
                  required
                  value={formState.wifiName}
                  onChange={handleFormChange('wifiName')}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Wi-Fi password"
                  fullWidth
                  required
                  value={formState.wifiPassword}
                  onChange={handleFormChange('wifiPassword')}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Security question"
                  fullWidth
                  required
                  value={formState.securityQuestion}
                  onChange={handleFormChange('securityQuestion')}
                  helperText="Example: What is our favorite cafe?"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Answer to the security question"
                  fullWidth
                  required
                  value={formState.securityAnswer}
                  onChange={handleFormChange('securityAnswer')}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }} alignItems="center">
              <Button
                type="submit"
                variant="contained"
                disabled={formSubmitting}
                sx={{ minWidth: 160 }}
              >
                {formSubmitting ? 'Saving…' : 'Save Wi-Fi'}
              </Button>
              {formMessage.type && (
                <Alert severity={formMessage.type} sx={{ flexGrow: 1 }}>
                  {formMessage.text}
                </Alert>
              )}
            </Stack>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 4 },
            background: 'linear-gradient(140deg, rgba(13,22,35,0.85), rgba(18,30,48,0.9))',
            border: '1px solid rgba(118,180,255,0.12)',
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
              Vault entries
            </Typography>

            {loadingEntries && (
              <Stack direction="row" spacing={2} alignItems="center" sx={{ color: '#fff' }}>
                <CircularProgress size={20} />
                <Typography variant="body2">Loading entries…</Typography>
              </Stack>
            )}

            {listError && <Alert severity="error">{listError}</Alert>}

            {!loadingEntries && !hasEntries && !listError && (
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                No Wi-Fi entries yet. Add one using the form above.
              </Typography>
            )}

            <Stack spacing={2}>
              {entries.map((entry) => (
                <Paper
                  key={entry.id}
                  elevation={2}
                  sx={{
                    p: 2.5,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    gap: 2,
                    background: 'rgba(19,31,50,0.85)',
                    border: '1px solid rgba(118,180,255,0.1)',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: '#8fb6ff', fontWeight: 600 }}>
                      {entry.personName && entry.personName.length > 0
                        ? entry.personName
                        : 'Unnamed'}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                      {entry.wifiName}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1.5}>
                    <Button variant="outlined" onClick={() => openEditDialog(entry)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(entry.id)}>
                      Delete
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Box>

      <Dialog
        open={editState.open}
        onClose={editState.saving ? undefined : closeEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editState.step === 'editing' ? 'Edit Wi-Fi entry' : 'Security verification'}
        </DialogTitle>
        <DialogContent dividers>
          {editState.loading && (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 2 }}>
              <CircularProgress size={20} />
              <Typography variant="body2">Please wait…</Typography>
            </Stack>
          )}
          {!editState.loading && editState.step === 'question' && (
            <Stack spacing={2} sx={{ py: 1 }}>
              <Typography variant="body2">
                Answer the security question to view or edit this Wi-Fi entry.
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: '#1a2a44', background: '#e5efff', p: 2, borderRadius: 2 }}
              >
                {editState.question || 'Security question unavailable'}
              </Typography>
              <TextField
                label="Answer"
                fullWidth
                value={editState.answer}
                onChange={(event) =>
                  setEditState((prev) => ({
                    ...prev,
                    answer: event.target.value,
                  }))
                }
              />
              {editState.error && <Alert severity="error">{editState.error}</Alert>}
            </Stack>
          )}

          {!editState.loading && editState.step === 'editing' && editState.detail && (
            <Stack spacing={2} sx={{ py: 1 }}>
              <TextField
                label="Person name"
                value={editState.detail.personName ?? ''}
                onChange={handleEditFieldChange('personName')}
                fullWidth
              />
              <TextField
                label="Wi-Fi name (SSID)"
                value={editState.detail.wifiName ?? ''}
                onChange={handleEditFieldChange('wifiName')}
                required
                fullWidth
              />
              <TextField
                label="Wi-Fi password"
                value={editState.detail.wifiPassword ?? ''}
                onChange={handleEditFieldChange('wifiPassword')}
                required
                fullWidth
              />
              <TextField
                label="Security question"
                value={editState.detail.securityQuestion ?? ''}
                onChange={handleEditFieldChange('securityQuestion')}
                required
                fullWidth
              />
              {editState.error && <Alert severity="error">{editState.error}</Alert>}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          {editState.step === 'question' ? (
            <>
              <Button onClick={closeEditDialog} disabled={editState.loading}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleVerifyAnswer}
                disabled={editState.loading}
              >
                Verify
              </Button>
            </>
          ) : (
            <>
              <Button onClick={closeEditDialog} disabled={editState.saving}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleEditSave}
                disabled={editState.saving}
              >
                {editState.saving ? 'Saving…' : 'Save changes'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

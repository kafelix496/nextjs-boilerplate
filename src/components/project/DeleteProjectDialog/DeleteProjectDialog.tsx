import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Dialog from '@/components/Dialog/Dialog'
import { deleteProject } from '@/redux-actions'

interface DeleteProjectFormDialogProps {
  appAbbreviation: string
  id: string
  isOpen: boolean
  handleClose: () => void
}

const DeleteProjectFormDialog: FC<DeleteProjectFormDialogProps> = ({
  appAbbreviation,
  id,
  isOpen,
  handleClose
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [isSubmitting, setSubmitting] = useState(false)

  const handleDelete = () => {
    setSubmitting(true)

    dispatch(deleteProject(id))

    handleClose()

    axios
      .delete(`/api/app/${appAbbreviation}/project/${id}`)
      .catch(() => {
        // TODO: fetch projects and dispatch setProjects

        alert(t('ERROR_ALERT_MESSAGE'))
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      title={t('DELETE_PROJECT_DIALOG_TITLE')}
      contentJsx={<Typography>{t('DELETE_PROJECT_DIALOG_CONTENT')}</Typography>}
      actionsJsx={
        <>
          <Button color="secondary" variant="outlined" onClick={handleClose}>
            {t('BUTTON_CANCEL')}
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            {t('BUTTON_DELETE')}
          </Button>
        </>
      }
    />
  )
}

export default DeleteProjectFormDialog

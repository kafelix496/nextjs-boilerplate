import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { AccessLevels, Apps } from '@/constants'
import { POST_WIDTH } from '@/constants/album'
import { selectUser } from '@/redux-selectors'

const AddPostButton = () => {
  const { t } = useTranslation('common')
  const user = useSelector(selectUser)

  const canAddPost =
    user!.accessLevel[Apps.familyAlbum] === AccessLevels.SUPER_ADMIN ||
    user!.accessLevel[Apps.familyAlbum] === AccessLevels.ADMIN

  if (!canAddPost) {
    return null
  }

  return (
    <Box className="__d-flex-center __d-flex-col ">
      <Box className="__d-h-full" sx={{ width: POST_WIDTH }}>
        <Button fullWidth variant="outlined">
          {t('ALBUM_ADD_POST')}
        </Button>
      </Box>
    </Box>
  )
}

export default AddPostButton


import { Card, CardMedia, CardContent, Typography   } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

interface StoreProps {
  store: Store;
}

const StoreCard = ({ store }:StoreProps ) => {
  const { name, description, img } = store;
  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          image={img}
          alt={name}
          sx={{ height: '150px', objectFit: 'cover' }}
        />
        <div className="flex flex-row justify-between px-4 items-center py-2">
          <p className="text=[20px] fw-bold">{name}</p>
          <IconButton aria-label="share">
            <ShareIcon sx={{width:20, height:20} } />
          </IconButton>
        </div>
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', minHeight:"100" }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default StoreCard;
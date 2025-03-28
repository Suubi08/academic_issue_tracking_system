import { Avatar, AvatarImage, AvatarFallback } from 'lucid-ui-react';

const MyAvatar = ({ src, alt }) => (
  <Avatar>
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback>Loading...</AvatarFallback>
  </Avatar>
);

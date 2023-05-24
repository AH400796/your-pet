import { DeletePetBtn } from 'components/buttons/buttons';
import {
  Wrapper,
  ImageWrapper,
  Image,
  TextWrapper,
  TextContent,
  Title,
  Text,
} from './PetsItem.styled';
import PropTypes from 'prop-types';

export const PetsItem = ({ url, name, date, breed, comments }) => {
  const handlDeleteBtn = () => {};
  // логіка видалення питомця;

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={url} alt={name} loading="lazy" />
      </ImageWrapper>
      <TextWrapper>
        <TextContent>
          <Title>Name: </Title>
          <Text> {name}</Text>
        </TextContent>
        <TextContent>
          <Title>Date of birth: </Title>
          <Text>
            {''}
            {date}
          </Text>
        </TextContent>
        <TextContent>
          <Title>Breed: </Title>
          <Text> {breed}</Text>
        </TextContent>
        <TextContent>
          <Title>
            Comments: <Text>{comments}</Text>
          </Title>
        </TextContent>
      </TextWrapper>
      <DeletePetBtn onClick={handlDeleteBtn} />
    </Wrapper>
  );
};

PetsItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
};
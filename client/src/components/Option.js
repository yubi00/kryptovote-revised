import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'
import '../styles/Option.css'

function Option({
  buttonLabel,
  img,
  title,
  subtitle,
  text,
  handleClick,
  disabled
}) {
  return (
    <div>
      <Card className="mb-5 pb-2 card-option h-100 shadow option-card">
        <CardImg top src={img} alt="Card image cap" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
          <CardText>{text}</CardText>
          <Button color="secondary" onClick={handleClick} disabled={disabled}>
            {buttonLabel}
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default Option

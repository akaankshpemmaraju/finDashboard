import React from 'react';
import '../styles/Card.css';

const Card = ({ 
  title, 
  subtitle, 
  children, 
  variant, 
  compact, 
  action, 
  footer,
  className,
  onClick
}) => {
  const cardClasses = [
    'card',
    variant ? `card-${variant}` : '',
    compact ? 'card-compact' : '',
    action ? 'card-action' : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={action ? onClick : undefined}>
      {(title || subtitle) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;

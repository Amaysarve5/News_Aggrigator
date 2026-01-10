import React from 'react'

const card = (props) => {
  // Handle potential null/undefined values
  const title = props.title || 'No Title';
  const description = props.description || 'No description available';
  const imgUrl = props.imgUrl || 'https://via.placeholder.com/400x200?text=No+Image';
  const url = props.url || '#';
  const author = props.author || 'Unknown';
  const source = typeof props.source === 'string' ? props.source : (props.source?.name || 'Unknown Source');
  const publishedAt = props.publishedAt ? new Date(props.publishedAt).toLocaleDateString() : 'N/A';

  return (
    <div className='everything-card mt-10'>
      <div className='everything-card-img'>
        <img src={imgUrl} alt="news" onError={(e) => {e.target.src = 'https://via.placeholder.com/800x450?text=No+Image'}} />
        <div className='img-overlay'>
          <span className='source-badge'>{source.substring(0, 30)}</span>
        </div>
      </div>

      <div className='card-content p-6'>
        <b className='title line-clamp-2'>{title}</b>

        <div className='distription mt-4 mb-4'>
          <p className='text-base desc-clamp'>{description ? description : 'No description available'}</p>
        </div>

        <div className='info flex items-center justify-between gap-4'>
          <div className='origin flex flex-col gap-1'>
            <p className='origin-item text-sm'>
              <span className='font-semibold'>Author: </span><span className='truncate'>{author}</span>
            </p>
            <p className='origin-item text-sm opacity-80'>
              <span className='font-semibold'>Published: </span>{publishedAt}
            </p>
          </div>

          <div className='card-actions flex flex-col items-end gap-3'>
            <a href={url} target="_blank" rel="noreferrer" className='read-more-btn'>Read full article</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default card
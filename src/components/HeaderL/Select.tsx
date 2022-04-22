import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  border: 1px solid #383751;
  border-radius: 6px;
`

const DropDown = styled.div`
  position: absolute;
  top: 100%;
  left: 0px;
  border: 1px solid #383751;
  width: 100%;
  border-radius: 6px;
  background-color: #f9f9fb;
  margin-top: 5px;
`

const Option = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #383751;
  cursor: pointer;
  padding: 5px 15px;
  transition: all 0.3s linear;

  &:hover {
    text-decoration: underline;
    color: #f6881e;
  }
`

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 15px;
  cursor: pointer;

  > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #383751;
    margin-right: 10px;
  }

  svg {
    color: #383751;
  }
`

export const Select = () => {
  const [option, setOption] = useState('ethereum')
  const [isDropDown, setIsDropDown] = useState(false)

  const chains = [
    {
      link: 'https://heco.sashimi.cool/',
      text: 'Heco',
      linkTarget: '_self'
    },
    {
      link: 'https://bsc.sashimi.cool/',
      text: 'BSC',
      linkTarget: '_self'
    }
  ]

  const handleChangeLink = (link: string) => {
    window.open(link)
  }

  const handleClickOutside = (e: any) => {
    if (e.target.closest('.chain-select') || !isDropDown) return
    setIsDropDown(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [isDropDown])

  return (
    <Container>
      <SelectedOption onClick={() => setIsDropDown(true)} className="chain-select">
        <span>Ethereum</span>
        <DownArrow />
      </SelectedOption>
      {isDropDown && (
        <DropDown>
          {chains.map((chain, i) => (
            <Option key={i} onClick={() => handleChangeLink(chain.link)}>
              {chain.text}
            </Option>
          ))}
        </DropDown>
      )}
    </Container>
  )
}

const DownArrow = () => {
  return (
    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.744078 0.910582C1.06951 0.585145 1.59715 0.585145 1.92259 0.910582L8 6.98799L14.0774 0.910582C14.4028 0.585145 14.9305 0.585145 15.2559 0.910582C15.5814 1.23602 15.5814 1.76366 15.2559 2.08909L8.58926 8.75576C8.26382 9.0812 7.73618 9.0812 7.41074 8.75576L0.744078 2.08909C0.418641 1.76366 0.418641 1.23602 0.744078 0.910582Z" fill="#383751"/>
    </svg>
  )
}

import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 0.2rem;
    color: red;
  }

  input {
    width: 30rem;
    height: 2rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    background-color: #000;
    color: #fff;
  }

  button {
    width: 4rem;
    height: 2rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 0.2rem;
    margin-bottom: 1rem;
    margin-left: 0.2rem;
    font-size: 1rem;
    background-color: #000;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #fff;
      color: #000;
    }
  }
`

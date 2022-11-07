import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { SearchPage } from "../../../src/heroes/pages/SearchPage"

const mockUseNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate
}))

describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks())

    test('should demostrarse correctamentecon valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot()
    })

    test('debe de mostrar a barman y el input con queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('batman')

        const img = screen.getByRole('img')
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg')

        const alert = screen.getByLabelText('alert-danger')
        expect(alert.style.display).toBe("none")
    })

    test('should de mostrar un error si no se encuentra el hero (batman123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const hero = screen.getByLabelText('noHero')
        expect(hero.style.display).not.toBe('none')

    })

    test('should de llamar el navigate a la pantalla nueva', () => {

        const hero = 'batman'

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        const form = screen.getByRole('form')

        fireEvent.input(input, { target: { name: 'searchText', value: hero } });
        fireEvent.submit(form);
        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${hero}`)
    })
})
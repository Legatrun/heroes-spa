import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../src/auth"
import { Navbar } from "../../../src/ui/components/Navbar"

const mockUseNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate
}))

describe('Pruebas en <NavBar />', () => {

    const contextValue = {
        logged: true,
        user: {
            name: "Strider",
            id: "ABC123"
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks())

    test('should de mostrar el nombre', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Strider')).toBeTruthy()
    })

    test('should de llamar al logout', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>

            </AuthContext.Provider>

        )

        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(contextValue.logout).toHaveBeenCalled()
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', {
            replace: true,
        })
    })
})


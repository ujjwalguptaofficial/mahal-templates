import { initiate, mount, getMount } from "mahal-test-utils";
import MahalIntro from "@/components/mahal_intro.mahal";
import { app } from "@/index";
import { expect } from "chai";


describe("Mahal Intro", () => {
    let component;
    before(async () => {
        const appMount = getMount(app);
        component = await appMount(MahalIntro);
    });

    it("check h1", () => {
        const h1 = component.find('h1');
        expect(h1.innerHTML).equal(`Welcome to the Mahal App`);
    });
});
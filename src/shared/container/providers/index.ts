import { container } from "tsyringe";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton("DayjsDateProvider", DayjsDateProvider);

container.registerInstance("EtherealMailProvider", new EtherealMailProvider());

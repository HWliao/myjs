import { NgModuleRef } from '@angular/core';
import { AppModule } from './app/app.module';
import { ConfigService } from './app/core/config/config.service';
import { ConfigModel } from './app/core/config/config.model';

/**
 * Im对外APi
 * @author lhw
 */
export class Im {

  /**
   * 配置服务
   */
  private readonly configService: ConfigService;

  constructor(moduleRef: NgModuleRef<AppModule>) {
    this.configService = moduleRef.injector.get(ConfigService);
  }

  /**
   * 设置配置
   * @param {ConfigModel} config
   */
  setConfig(config: ConfigModel) {
    return this.configService.setConfig(config);
  }
}
